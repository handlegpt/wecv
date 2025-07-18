'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

interface AIAssistantProps {
  onContentGenerated: (content: string, type: string) => void
  currentContent?: string
  contentType?: string
}

export default function AIAssistant({ onContentGenerated, currentContent = '', contentType = 'summary' }: AIAssistantProps) {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const contentTypeLabels = {
    summary: '个人简介',
    experience: '工作经历',
    education: '教育背景',
    skills: '技能专长',
    project: '项目经历'
  }

  const contentTypePrompts = {
    summary: '请帮我写一段专业的个人简介，突出我的专业技能和工作经验',
    experience: '请帮我优化这段工作经历描述，使其更专业和突出成就',
    education: '请帮我写一段教育背景描述，突出我的学术成就和专业技能',
    skills: '请帮我整理和优化技能列表，按照技术栈、软技能、工具等分类',
    project: '请帮我描述这个项目经历，突出技术难点和解决方案'
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('请输入描述内容')
      return
    }

    setIsGenerating(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/write`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: contentType,
          prompt: prompt,
          context: currentContent
        })
      })

      if (response.ok) {
        const data = await response.json()
        onContentGenerated(data.result, contentType)
        setSuggestions(data.suggestions || [])
        toast.success('AI生成完成！')
      } else {
        toast.error('AI生成失败')
      }
    } catch (error) {
      toast.error('网络错误')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleQuickPrompt = (quickPrompt: string) => {
    setPrompt(quickPrompt)
  }

  const quickPrompts = {
    summary: [
      '请帮我写一段个人简介，突出我的技术能力和项目经验',
      '请帮我写一段个人简介，强调我的领导力和团队协作能力',
      '请帮我写一段个人简介，突出我的创新思维和解决问题的能力'
    ],
    experience: [
      '请帮我优化这段工作经历，用STAR法则重新组织',
      '请帮我优化这段工作经历，突出技术难点和解决方案',
      '请帮我优化这段工作经历，用数据量化成果'
    ],
    education: [
      '请帮我写一段教育背景，突出相关课程和项目经验',
      '请帮我写一段教育背景，强调学术成就和研究能力',
      '请帮我写一段教育背景，突出国际交流和学习能力'
    ],
    skills: [
      '请帮我整理技能列表，按熟练程度排序',
      '请帮我整理技能列表，按技术栈分类',
      '请帮我整理技能列表，突出核心技能'
    ],
    project: [
      '请帮我描述这个项目，突出技术架构和创新点',
      '请帮我描述这个项目，强调团队协作和项目管理',
      '请帮我描述这个项目，突出商业价值和用户反馈'
    ]
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          AI 写作助手 - {contentTypeLabels[contentType as keyof typeof contentTypeLabels]}
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">AI 在线</span>
        </div>
      </div>

      {/* 快速提示 */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">快速提示：</p>
        <div className="flex flex-wrap gap-2">
          {quickPrompts[contentType as keyof typeof quickPrompts]?.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleQuickPrompt(prompt)}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              {prompt.slice(0, 20)}...
            </button>
          ))}
        </div>
      </div>

      {/* 输入区域 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          描述您的需求
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder={contentTypePrompts[contentType as keyof typeof contentTypePrompts]}
        />
      </div>

      {/* 生成按钮 */}
      <div className="mb-4">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              AI 生成中...
            </div>
          ) : (
            '生成内容'
          )}
        </button>
      </div>

      {/* AI 建议 */}
      {suggestions.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">AI 建议：</h4>
          <ul className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 使用提示 */}
      <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <h4 className="text-sm font-medium text-blue-900 mb-1">💡 使用提示</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• 提供具体的背景信息，AI 会生成更精准的内容</li>
          <li>• 描述您的技能、经验或成就，AI 会帮您优化表达</li>
          <li>• 可以多次生成，选择最适合的内容</li>
        </ul>
      </div>
    </div>
  )
} 