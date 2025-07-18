import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: '未授权' })
  }
  try {
    const token = auth.replace('Bearer ', '')
    const payload = jwt.verify(token, JWT_SECRET) as any
    req.userId = payload.userId
    next()
  } catch {
    return res.status(401).json({ message: 'Token无效' })
  }
}

export async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    })

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: '需要管理员权限' })
    }

    next()
  } catch (error) {
    return res.status(500).json({ message: '权限验证失败' })
  }
} 