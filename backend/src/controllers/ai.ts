import { Request, Response } from 'express'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// 简历写作提示模板
const PROMPT_TEMPLATES: Record<string, string> = {
  summary: '请帮我优化简历中的个人总结部分，使其更加专业和有说服力。',
  experience: '请帮我优化简历中的工作经验部分，突出成就和贡献。',
  education: '请帮我优化简历中的教育背景部分，突出相关课程和成就。',
  skills: '请帮我优化简历中的技能部分，按重要性和熟练程度排序。',
  project: '请帮我优化简历中的项目经验部分，突出技术难点和成果。'
}

export async function generateContent(req: Request, res: Response) {
  const { prompt, type, context, max_tokens = 1000 } = req.body
  
  if (!prompt && !context) {
    return res.status(400).json({ message: '缺少提示内容或上下文' })
  }

  try {
    let finalPrompt = prompt
    
    // 如果提供了类型，使用对应的提示模板
    if (type && PROMPT_TEMPLATES[type as keyof typeof PROMPT_TEMPLATES]) {
      finalPrompt = `${PROMPT_TEMPLATES[type as keyof typeof PROMPT_TEMPLATES]}\n\n用户输入：${prompt || context || ''}`
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '你是一个专业的简历写作专家，擅长优化简历内容，使其更专业、更有说服力。请根据用户的需求提供高质量的简历内容建议。'
        },
        {
          role: 'user',
          content: finalPrompt
        }
      ],
      max_tokens,
      temperature: 0.7
    })

    const result = completion.choices[0].message?.content
    
    res.json({ 
      result,
      type,
      suggestions: generateSuggestions(type, result)
    })
  } catch (error) {
    console.error('AI生成错误:', error)
    const errorMessage = error instanceof Error ? error.message : '未知错误'
    res.status(500).json({ message: 'AI生成失败', error: errorMessage })
  }
}

// 生成相关建议
function generateSuggestions(type: string, content: string): string[] {
  const suggestions = {
    summary: [
      '建议添加具体的职业目标',
      '可以提及行业经验年限',
      '建议突出核心竞争力'
    ],
    experience: [
      '建议用数据量化成果',
      '可以使用更多动词开头',
      '建议突出技术难点'
    ],
    education: [
      '可以提及相关课程',
      '建议突出学术成就',
      '可以提及项目经验'
    ],
    skills: [
      '建议按熟练程度排序',
      '可以添加技能等级',
      '建议突出核心技能'
    ]
  }
  
  return suggestions[type] || []
}

// 智能简历分析
export async function analyzeResume(req: Request, res: Response) {
  const { content } = req.body
  
  if (!content) {
    return res.status(400).json({ message: '缺少简历内容' })
  }

  try {
    const analysisPrompt = `
请分析以下简历内容，并提供改进建议：

${JSON.stringify(content, null, 2)}

请从以下方面进行分析：
1. 内容完整性
2. 表达专业性
3. 突出成就
4. 技能匹配度
5. 整体结构
6. 具体改进建议
`

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '你是一个专业的简历分析专家，能够全面分析简历内容并提供具体的改进建议。'
        },
        {
          role: 'user',
          content: analysisPrompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.5
    })

    const analysis = completion.choices[0].message?.content
    
    res.json({ 
      analysis,
      score: calculateScore(content),
      recommendations: extractRecommendations(analysis)
    })
  } catch (error) {
    console.error('简历分析错误:', error)
    res.status(500).json({ message: '简历分析失败', error: error.message })
  }
}

// 计算简历评分
function calculateScore(content: any): number {
  let score = 0
  
  // 检查基本信息
  if (content.personal?.name) score += 10
  if (content.personal?.email) score += 10
  if (content.personal?.phone) score += 5
  
  // 检查个人简介
  if (content.summary && content.summary.length > 50) score += 15
  
  // 检查工作经历
  if (content.experience && content.experience.length > 0) {
    score += Math.min(content.experience.length * 10, 30)
  }
  
  // 检查教育背景
  if (content.education && content.education.length > 0) score += 10
  
  // 检查技能
  if (content.skills && content.skills.length > 0) {
    score += Math.min(content.skills.length * 2, 20)
  }
  
  return Math.min(score, 100)
}

// 提取建议
function extractRecommendations(analysis: string): string[] {
  const recommendations = []
  const lines = analysis.split('\n')
  
  for (const line of lines) {
    if (line.includes('建议') || line.includes('推荐') || line.includes('改进')) {
      recommendations.push(line.trim())
    }
  }
  
  return recommendations.slice(0, 5) // 最多返回5条建议
} 

// AI翻译功能
export async function translateContent(req: Request, res: Response) {
  const { content, sourceLanguage, targetLanguage } = req.body
  
  if (!content || !sourceLanguage || !targetLanguage) {
    return res.status(400).json({ message: '缺少必要参数' })
  }

  try {
    const languageNames = {
      'en-US': 'English',
      'zh-CN': 'Chinese (Simplified)',
      'zh-TW': 'Chinese (Traditional)',
      'ja-JP': 'Japanese',
      'es-ES': 'Spanish',
      'fr-FR': 'French',
      'de-DE': 'German'
    }

    const sourceLang = languageNames[sourceLanguage] || sourceLanguage
    const targetLang = languageNames[targetLanguage] || targetLanguage

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `你是一个专业的翻译专家，请将以下内容从${sourceLang}翻译成${targetLang}，保持专业性和准确性。`
        },
        {
          role: 'user',
          content: content
        }
      ],
      max_tokens: 1000,
      temperature: 0.3
    })

    const translatedContent = completion.choices[0].message?.content
    
    res.json({ 
      translatedContent,
      sourceLanguage,
      targetLanguage
    })
  } catch (error) {
    console.error('翻译错误:', error)
    res.status(500).json({ message: '翻译失败', error: error.message })
  }
}

// AI内容优化
export async function optimizeContent(req: Request, res: Response) {
  const { content, type, target } = req.body
  
  if (!content) {
    return res.status(400).json({ message: '缺少内容参数' })
  }

  try {
    let optimizationPrompt = ''
    
    switch (type) {
      case 'summary':
        optimizationPrompt = '请优化以下个人简介，使其更专业、更有说服力：'
        break
      case 'experience':
        optimizationPrompt = '请优化以下工作经历描述，使用STAR法则，突出成就和技能：'
        break
      case 'skills':
        optimizationPrompt = '请优化以下技能列表，按重要性排序并添加熟练程度：'
        break
      default:
        optimizationPrompt = '请优化以下内容，使其更专业和突出：'
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '你是一个专业的简历内容优化专家，擅长改进简历内容使其更专业和有说服力。'
        },
        {
          role: 'user',
          content: `${optimizationPrompt}\n\n${content}`
        }
      ],
      max_tokens: 800,
      temperature: 0.6
    })

    const optimizedContent = completion.choices[0].message?.content
    
    res.json({ 
      optimizedContent,
      type,
      suggestions: generateOptimizationSuggestions(type, optimizedContent)
    })
  } catch (error) {
    console.error('内容优化错误:', error)
    res.status(500).json({ message: '内容优化失败', error: error.message })
  }
}

// 生成优化建议
function generateOptimizationSuggestions(type: string, content: string): string[] {
  const suggestions = {
    summary: [
      '建议添加具体的职业目标',
      '可以提及行业经验年限',
      '建议突出核心竞争力'
    ],
    experience: [
      '建议用数据量化成果',
      '可以使用更多动词开头',
      '建议突出技术难点'
    ],
    skills: [
      '建议按熟练程度排序',
      '可以添加技能等级',
      '建议突出核心技能'
    ]
  }
  
  return suggestions[type] || []
} 