import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getTemplates(req: Request, res: Response) {
  const templates = await prisma.template.findMany()
  res.json(templates)
} 