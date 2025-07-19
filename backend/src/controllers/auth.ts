import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'
import axios from 'axios'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

// Email transporter configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
})

// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google-login'

export async function register(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        message: '邮箱和密码必填',
        error: 'MISSING_REQUIRED_FIELDS'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: '请输入有效的邮箱地址',
        error: 'INVALID_EMAIL_FORMAT'
      })
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ 
        message: '密码至少6位',
        error: 'PASSWORD_TOO_SHORT'
      })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    })
    
    if (existingUser) {
      return res.status(409).json({ 
        message: '该邮箱已被注册',
        error: 'USER_ALREADY_EXISTS'
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: { 
        email: email.toLowerCase(), 
        password: hashedPassword, 
        name: name || email.split('@')[0] // Use email prefix as default name
      }
    })

    console.log(`User registered successfully: ${user.email}`)
    
    res.status(201).json({ 
      message: '注册成功',
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ 
      message: '注册失败，请重试',
      error: 'INTERNAL_SERVER_ERROR'
    })
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        message: '邮箱和密码必填',
        error: 'MISSING_REQUIRED_FIELDS'
      })
    }

    // Find user
    const user = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    })
    
    if (!user) {
      return res.status(401).json({ 
        message: '用户不存在或密码错误',
        error: 'INVALID_CREDENTIALS'
      })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ 
        message: '用户不存在或密码错误',
        error: 'INVALID_CREDENTIALS'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    )

    console.log(`User logged in successfully: ${user.email}`)

    res.json({ 
      message: '登录成功',
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      } 
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ 
      message: '登录失败，请重试',
      error: 'INTERNAL_SERVER_ERROR'
    })
  }
}

export async function googleCallback(req: Request, res: Response) {
  try {
    const { code } = req.body
    
    if (!code) {
      return res.status(400).json({ 
        message: '授权码缺失',
        error: 'MISSING_AUTH_CODE'
      })
    }

    // Exchange authorization code for access token
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: GOOGLE_REDIRECT_URI
    })

    const { access_token } = tokenResponse.data

    // Get user info from Google
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    const { id, email, name, picture } = userInfoResponse.data

    // Check if user exists
    let user = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    })

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: { 
          email: email.toLowerCase(), 
          name: name || email.split('@')[0],
          password: '', // Google users don't need password
          settings: {
            googleId: id,
            avatar: picture
          }
        }
      })
      console.log(`Google user created: ${user.email}`)
    } else {
      // Update existing user with Google info
      await prisma.user.update({
        where: { id: user.id },
        data: {
          settings: {
            ...user.settings,
            googleId: id,
            avatar: picture
          }
        }
      })
      console.log(`Google user logged in: ${user.email}`)
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    )

    res.json({ 
      message: '谷歌登录成功',
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      } 
    })
  } catch (error) {
    console.error('Google callback error:', error)
    res.status(500).json({ 
      message: '谷歌登录失败，请重试',
      error: 'GOOGLE_LOGIN_FAILED'
    })
  }
}

export async function emailLogin(req: Request, res: Response) {
  try {
    const { email } = req.body
    
    // Validate email
    if (!email) {
      return res.status(400).json({ 
        message: '请输入邮箱地址',
        error: 'MISSING_EMAIL'
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: '请输入有效的邮箱地址',
        error: 'INVALID_EMAIL_FORMAT'
      })
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    })
    
    if (!user) {
      return res.status(404).json({ 
        message: '该邮箱未注册',
        error: 'USER_NOT_FOUND'
      })
    }

    // Generate login token
    const loginToken = jwt.sign(
      { userId: user.id, email: user.email, type: 'email-login' }, 
      JWT_SECRET, 
      { expiresIn: '15m' } // 15 minutes expiry
    )

    // Create login URL
    const loginUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/verify-email?token=${loginToken}`

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@wecv.ai',
      to: email,
      subject: 'WeCV AI - 登录链接',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">WeCV AI 登录</h2>
          <p>您好 ${user.name || '用户'}，</p>
          <p>您请求了邮件登录。请点击下面的链接登录您的账户：</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${loginUrl}" 
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              登录 WeCV AI
            </a>
          </div>
          <p>此链接将在15分钟后失效。</p>
          <p>如果您没有请求此登录，请忽略此邮件。</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px;">
            此邮件由 WeCV AI 系统自动发送，请勿回复。
          </p>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)

    console.log(`Email login link sent to: ${email}`)

    res.json({ 
      message: '登录链接已发送到您的邮箱',
      email: email
    })
  } catch (error) {
    console.error('Email login error:', error)
    res.status(500).json({ 
      message: '邮件发送失败，请重试',
      error: 'EMAIL_SEND_FAILED'
    })
  }
}

export async function verifyEmailLogin(req: Request, res: Response) {
  try {
    const { token } = req.body
    
    if (!token) {
      return res.status(400).json({ 
        message: '无效的验证链接',
        error: 'MISSING_TOKEN'
      })
    }

    // Verify token
    const payload = jwt.verify(token, JWT_SECRET) as any
    
    if (payload.type !== 'email-login') {
      return res.status(400).json({ 
        message: '无效的验证链接',
        error: 'INVALID_TOKEN_TYPE'
      })
    }

    // Find user
    const user = await prisma.user.findUnique({ 
      where: { id: payload.userId } 
    })
    
    if (!user) {
      return res.status(404).json({ 
        message: '用户不存在',
        error: 'USER_NOT_FOUND'
      })
    }

    // Generate session token
    const sessionToken = jwt.sign(
      { userId: user.id, email: user.email }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    )

    console.log(`User logged in via email: ${user.email}`)

    res.json({ 
      message: '登录成功',
      token: sessionToken, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      } 
    })
  } catch (error) {
    console.error('Email verification error:', error)
    res.status(400).json({ 
      message: '验证链接已失效或无效',
      error: 'INVALID_TOKEN'
    })
  }
} 