import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function getSettings(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        name: true,
        email: true,
        phone: true,
        location: true,
        bio: true,
        settings: true
      }
    })

    if (!user) {
      return res.status(404).json({ message: '用户不存在' })
    }

    // 合并默认设置
    const settings = {
      name: user.name || '',
      email: user.email,
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || '',
      notifications: {
        email: true,
        push: true,
        marketing: false
      },
      privacy: {
        profilePublic: false,
        resumePublic: false,
        showEmail: false
      },
      ...user.settings
    }

    res.json(settings)
  } catch (error) {
    console.error('获取设置错误:', error)
    res.status(500).json({ message: '获取设置失败' })
  }
}

export async function updateSettings(req: Request, res: Response) {
  try {
    const { name, email, phone, location, bio, notifications, privacy } = req.body

    // 验证邮箱格式
    if (email && !email.includes('@')) {
      return res.status(400).json({ message: '邮箱格式不正确' })
    }

    // 检查邮箱是否已被其他用户使用
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          id: { not: req.userId }
        }
      })
      if (existingUser) {
        return res.status(400).json({ message: '邮箱已被使用' })
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        name,
        email,
        phone,
        location,
        bio,
        settings: {
          notifications,
          privacy
        }
      }
    })

    res.json({ message: '设置更新成功', user: updatedUser })
  } catch (error) {
    console.error('更新设置错误:', error)
    res.status(500).json({ message: '更新设置失败' })
  }
}

export async function changePassword(req: Request, res: Response) {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: '请提供当前密码和新密码' })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: '新密码至少6位' })
    }

    // 获取用户当前密码
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { password: true }
    })

    if (!user) {
      return res.status(404).json({ message: '用户不存在' })
    }

    // 验证当前密码
    const isValidPassword = await bcrypt.compare(currentPassword, user.password)
    if (!isValidPassword) {
      return res.status(400).json({ message: '当前密码不正确' })
    }

    // 加密新密码
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // 更新密码
    await prisma.user.update({
      where: { id: req.userId },
      data: { password: hashedPassword }
    })

    res.json({ message: '密码修改成功' })
  } catch (error) {
    console.error('修改密码错误:', error)
    res.status(500).json({ message: '修改密码失败' })
  }
} 