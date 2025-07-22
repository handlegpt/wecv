import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('开始初始化数据库...')

  // 创建管理员用户
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@wecv.ai' },
    update: {},
    create: {
      email: 'admin@wecv.ai',
      password: adminPassword,
      name: '系统管理员',
      role: 'admin',
      settings: {
        notifications: {
          email: true,
          push: true,
          marketing: false
        },
        privacy: {
          profilePublic: false,
          resumePublic: false,
          showEmail: false
        }
      }
    }
  })
  console.log('管理员用户创建成功:', admin.email)

  // 创建测试用户
  const userPassword = await bcrypt.hash('user123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'user@wecv.ai' },
    update: {},
    create: {
      email: 'user@wecv.ai',
      password: userPassword,
      name: '测试用户',
      role: 'user',
      settings: {
        notifications: {
          email: true,
          push: true,
          marketing: false
        },
        privacy: {
          profilePublic: false,
          resumePublic: false,
          showEmail: false
        }
      }
    }
  })
  console.log('测试用户创建成功:', user.email)

  // 创建简历模板
  const templates = [
    {
      id: 'modern',
      name: '现代专业',
      category: 'modern',
      preview: '现代简约风格，适合技术岗位'
    },
    {
      id: 'classic',
      name: '经典传统',
      category: 'classic',
      preview: '经典商务风格，适合管理岗位'
    },
    {
      id: 'creative',
      name: '创意作品集',
      category: 'creative',
      preview: '创意设计风格，适合设计岗位'
    },
    {
      id: 'minimal',
      name: '极简清洁',
      category: 'minimal',
      preview: '极简风格，适合所有岗位'
    },
    {
      id: 'impact',
      name: '影响力专业',
      category: 'executive',
      preview: '强调成就和可量化结果的大胆设计'
    },
    {
      id: 'clean',
      name: '清洁极简',
      category: 'professional',
      preview: '简洁清洁的设计，专注于内容清晰度'
    },
    {
      id: 'contemporary',
      name: '当代现代',
      category: 'modern',
      preview: '现代设计，平衡专业和创意元素'
    },
    {
      id: 'executive',
      name: '高管领导',
      category: 'executive',
      preview: '适合高级管理职位的精致设计'
    },
    {
      id: 'elegant',
      name: '优雅专业',
      category: 'creative',
      preview: '精致的排版和布局设计'
    },
    {
      id: 'simple',
      name: '简单基础',
      category: 'minimal',
      preview: '超极简设计，最大可读性'
    }
  ]

  for (const template of templates) {
    await prisma.template.upsert({
      where: { id: template.id },
      update: {},
      create: template
    })
  }
  console.log('简历模板创建成功')

  // 创建示例简历
  const sampleResume = await prisma.resume.create({
    data: {
      title: '软件工程师简历',
      content: {
        personal: {
          name: '张三',
          email: 'zhangsan@example.com',
          phone: '13800138000',
          location: '北京市朝阳区'
        },
        summary: '拥有5年软件开发经验，熟练掌握React、Node.js等技术栈，具备良好的团队协作能力和问题解决能力。',
        experience: [
          {
            title: '高级前端工程师',
            company: '科技有限公司',
            period: '2022-至今',
            description: '负责公司核心产品的前端开发，带领团队完成多个重要项目，提升用户体验和系统性能。'
          },
          {
            title: '前端工程师',
            company: '互联网公司',
            period: '2020-2022',
            description: '参与电商平台的前端开发，负责用户界面设计和交互实现，获得优秀员工称号。'
          }
        ],
        education: [
          {
            degree: '计算机科学与技术',
            school: '北京大学',
            period: '2016-2020',
            description: '主修计算机科学，获得学士学位，参与多个学术项目。'
          }
        ],
        skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Git']
      },
      userId: user.id,
      templateId: (await prisma.template.findFirst({ where: { id: 'modern' } }))?.id
    }
  })
  console.log('示例简历创建成功')

  console.log('数据库初始化完成！')
  console.log('')
  console.log('默认账号信息：')
  console.log('管理员: admin@wecv.ai / admin123')
  console.log('用户: user@wecv.ai / user123')
}

main()
  .catch((e) => {
    console.error('数据库初始化失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 