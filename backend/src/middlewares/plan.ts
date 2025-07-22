import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function checkPlanLimit(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    })

    if (!user) {
      return res.status(404).json({ message: '用户不存在' })
    }

    // Check if plan has expired
    if (user.planExpiresAt && user.planExpiresAt < new Date()) {
      // Downgrade to free plan
      await prisma.user.update({
        where: { id: user.id },
        data: {
          plan: 'free',
          planExpiresAt: null,
          maxResumes: 3,
          canUseAI: false,
          canShare: false,
          canAnalytics: false,
          canMultiLanguage: false
        }
      })
      user.plan = 'free'
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(500).json({ message: '检查用户计划失败' })
  }
}

export function requireFeature(feature: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any
    
    if (!user) {
      return res.status(401).json({ message: '未授权' })
    }

    const featureMap: { [key: string]: string } = {
      'ai': 'canUseAI',
      'share': 'canShare',
      'analytics': 'canAnalytics',
      'multiLanguage': 'canMultiLanguage',
      'export': 'canExport',
      'templates': 'canTemplates'
    }

    const featureKey = featureMap[feature]
    if (!featureKey || !user[featureKey]) {
      return res.status(403).json({ 
        message: '此功能需要升级到付费计划',
        error: 'FEATURE_NOT_AVAILABLE',
        requiredPlan: 'pro'
      })
    }

    next()
  }
}

export function checkResumeLimit(req: Request, res: Response, next: NextFunction) {
  const user = req.user as any
  
  if (!user) {
    return res.status(401).json({ message: '未授权' })
  }

  // Check if user has reached resume limit
  prisma.resume.count({
    where: { userId: user.id }
  }).then(count => {
    if (count >= user.maxResumes) {
      return res.status(403).json({
        message: `您已达到简历数量限制 (${user.maxResumes})。请升级到付费计划以创建更多简历。`,
        error: 'RESUME_LIMIT_REACHED',
        currentCount: count,
        maxResumes: user.maxResumes,
        requiredPlan: 'pro'
      })
    }
    next()
  }).catch(error => {
    return res.status(500).json({ message: '检查简历数量失败' })
  })
} 