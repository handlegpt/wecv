import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

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