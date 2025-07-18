import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: '邮箱和密码必填' })
  }
  const exist = await prisma.user.findUnique({ where: { email } })
  if (exist) {
    return res.status(409).json({ message: '用户已存在' })
  }
  const hash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { email, password: hash, name }
  })
  res.json({ id: user.id, email: user.email, name: user.name })
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: '邮箱和密码必填' })
  }
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(401).json({ message: '用户不存在' })
  }
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return res.status(401).json({ message: '密码错误' })
  }
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } })
} 