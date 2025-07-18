import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import puppeteer from 'puppeteer'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export async function getAllResumes(req: Request, res: Response) {
  const userId = req.userId
  const resumes = await prisma.resume.findMany({ where: { userId } })
  res.json(resumes)
}

export async function getResume(req: Request, res: Response) {
  const userId = req.userId
  const { id } = req.params
  const resume = await prisma.resume.findFirst({ where: { id, userId } })
  if (!resume) return res.status(404).json({ message: '未找到简历' })
  res.json(resume)
}

export async function createResume(req: Request, res: Response) {
  const userId = req.userId
  const { title, content, templateId } = req.body
  const resume = await prisma.resume.create({
    data: { title, content, userId, templateId }
  })
  res.json(resume)
}

export async function updateResume(req: Request, res: Response) {
  const userId = req.userId
  const { id } = req.params
  const { title, content, templateId } = req.body
  const resume = await prisma.resume.updateMany({
    where: { id, userId },
    data: { title, content, templateId }
  })
  res.json(resume)
}

export async function deleteResume(req: Request, res: Response) {
  const userId = req.userId
  const { id } = req.params
  await prisma.resume.deleteMany({ where: { id, userId } })
  res.json({ success: true })
}

export async function exportResume(req: Request, res: Response) {
  const userId = req.userId
  const { id } = req.params
  const { format, data } = req.body

  const resume = await prisma.resume.findFirst({ where: { id, userId } })
  if (!resume) return res.status(404).json({ message: '未找到简历' })

  try {
    let content: string | Buffer

    switch (format) {
      case 'pdf':
        content = await generatePDF(data)
        res.setHeader('Content-Type', 'application/pdf')
        break
      case 'word':
        content = await generateWord(data)
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        break
      case 'html':
        content = generateHTML(data)
        res.setHeader('Content-Type', 'text/html')
        break
      default:
        return res.status(400).json({ message: '不支持的导出格式' })
    }

    res.setHeader('Content-Disposition', `attachment; filename="${resume.title || 'resume'}.${format}"`)
    res.send(content)
  } catch (error) {
    res.status(500).json({ message: '导出失败' })
  }
}

export async function shareResume(req: Request, res: Response) {
  const userId = req.userId
  const { id } = req.params

  const resume = await prisma.resume.findFirst({ where: { id, userId } })
  if (!resume) return res.status(404).json({ message: '未找到简历' })

  try {
    const shareUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/resume/${resume.id}`
    
    // 更新简历为公开状态
    await prisma.resume.update({
      where: { id },
      data: { isPublic: true, shareUrl }
    })

    res.json({ shareUrl })
  } catch (error) {
    res.status(500).json({ message: '生成分享链接失败' })
  }
}

// 生成PDF
async function generatePDF(data: any): Promise<Buffer> {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  
  const html = generateHTML(data)
  await page.setContent(html)
  
  const pdf = await page.pdf({ 
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }
  })
  
  await browser.close()
  return pdf
}

// 生成Word文档
async function generateWord(data: any): Promise<Buffer> {
  // 这里可以使用 docx 库生成 Word 文档
  // 简化实现，返回 HTML 内容
  const html = generateHTML(data)
  return Buffer.from(html, 'utf-8')
}

// 生成HTML
function generateHTML(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${data.title || '简历'}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 20px; }
        .section-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
        .content { line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${data.content?.personal?.name || '姓名'}</h1>
        <p>${data.content?.personal?.email || '邮箱'}</p>
      </div>
      
      <div class="section">
        <div class="section-title">个人简介</div>
        <div class="content">${data.content?.summary || ''}</div>
      </div>
      
      <div class="section">
        <div class="section-title">工作经历</div>
        <div class="content">${data.content?.experience?.map((exp: any) => `
          <div style="margin-bottom: 15px;">
            <strong>${exp.title || ''}</strong><br>
            <em>${exp.company || ''} | ${exp.period || ''}</em><br>
            ${exp.description || ''}
          </div>
        `).join('') || ''}</div>
      </div>
      
      <div class="section">
        <div class="section-title">教育背景</div>
        <div class="content">${data.content?.education?.map((edu: any) => `
          <div style="margin-bottom: 15px;">
            <strong>${edu.degree || ''}</strong><br>
            <em>${edu.school || ''} | ${edu.period || ''}</em><br>
            ${edu.description || ''}
          </div>
        `).join('') || ''}</div>
      </div>
      
      <div class="section">
        <div class="section-title">技能</div>
        <div class="content">${data.content?.skills?.join(', ') || ''}</div>
      </div>
    </body>
    </html>
  `
} 