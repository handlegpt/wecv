import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getStats(req: Request, res: Response) {
  try {
    const [totalUsers, totalResumes, totalTemplates, activeUsers] = await Promise.all([
      prisma.user.count(),
      prisma.resume.count(),
      prisma.template.count(),
      prisma.user.count({
        where: {
          updatedAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 最近30天
          }
        }
      })
    ])

    res.json({
      totalUsers,
      totalResumes,
      totalTemplates,
      activeUsers
    })
  } catch (error) {
    res.status(500).json({ message: '获取统计数据失败' })
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        role: true,
        _count: {
          select: {
            resumes: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const usersWithResumeCount = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      role: user.role,
      resumeCount: user._count.resumes
    }))

    res.json(usersWithResumeCount)
  } catch (error) {
    res.status(500).json({ message: '获取用户列表失败' })
  }
}

export async function updateUserRole(req: Request, res: Response) {
  const { id } = req.params
  const { role } = req.body

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: '无效的角色' })
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: { role }
    })

    res.json({ message: '用户角色更新成功', user })
  } catch (error) {
    res.status(500).json({ message: '更新用户角色失败' })
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params

  try {
    // 先删除用户的简历
    await prisma.resume.deleteMany({
      where: { userId: id }
    })

    // 然后删除用户
    await prisma.user.delete({
      where: { id }
    })

    res.json({ message: '用户删除成功' })
  } catch (error) {
    res.status(500).json({ message: '删除用户失败' })
  }
} 