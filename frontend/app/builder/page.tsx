'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface Template {
  id: string
  name: string
  category: string
}

export default function BuilderPage() {
  const { t } = useTranslation()
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [resumeData, setResumeData] = useState({
    title: '',
    content: {
      personal: { name: '', email: '', phone: '', location: '' },
      summary: '',
      experience: [],
      education: [],
      skills: [] as string[]
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/template`)
      if (response.ok) {
        const data = await response.json()
        setTemplates(data)
        if (data.length > 0) {
          setSelectedTemplate(data[0].id)
        }
      } else {
        // 使用模拟数据作为后备
        const mockTemplates = [
          { id: 'modern', name: 'Modern Professional', category: 'modern' },
          { id: 'classic', name: 'Classic Traditional', category: 'classic' },
          { id: 'creative', name: 'Creative Portfolio', category: 'creative' },
          { id: 'minimal', name: 'Minimal Clean', category: 'minimal' }
        ]
        setTemplates(mockTemplates)
        setSelectedTemplate('modern')
      }
    } catch (error) {
      // 使用模拟数据作为后备
      const mockTemplates = [
        { id: 'modern', name: 'Modern Professional', category: 'modern' },
        { id: 'classic', name: 'Classic Traditional', category: 'classic' },
        { id: 'creative', name: 'Creative Portfolio', category: 'creative' },
        { id: 'minimal', name: 'Minimal Clean', category: 'minimal' }
      ]
      setTemplates(mockTemplates)
      setSelectedTemplate('modern')
    }
  }

  const handleSave = async () => {
    if (!resumeData.title.trim()) {
      toast.error('请输入简历标题')
      return
    }

    if (!isLoggedIn) {
      // 如果未登录，提示用户注册
      toast.error('请先注册账号以保存简历')
      router.push('/auth/register')
      return
    }

    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: resumeData.title,
          content: resumeData.content,
          templateId: selectedTemplate
        })
      })

      if (response.ok) {
        toast.success('简历保存成功！')
        router.push('/dashboard')
      } else {
        toast.error('保存失败')
      }
    } catch (error) {
      toast.error('网络错误')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreview = () => {
    // 预览功能，不需要登录
    if (!resumeData.title.trim()) {
      toast.error('请输入简历标题')
      return
    }
    toast.success('预览功能开发中...')
  }

  const handleAIAssist = async (section: string, prompt: string) => {
    if (!isLoggedIn) {
      toast.error('请先注册账号以使用AI功能')
      router.push('/auth/register')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/write`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt })
      })

      if (response.ok) {
        const data = await response.json()
        toast.success('AI生成完成！')
        return data.result
      } else {
        toast.error('AI生成失败')
      }
    } catch (error) {
      toast.error('网络错误')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">WeCV AI - Resume Builder</h1>
            <div className="flex space-x-4">
              {!isLoggedIn && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">体验模式</span>
                  <Link href="/auth/register" className="btn-primary">
                    注册保存
                  </Link>
                </div>
              )}
              <button
                onClick={handlePreview}
                className="btn-secondary"
              >
                预览简历
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? '保存中...' : (isLoggedIn ? '保存简历' : '注册保存')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!isLoggedIn && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>体验模式：</strong>您可以免费体验简历创建功能。注册账号后可以保存简历、使用AI功能等。
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">基本信息</h2>
              
              {/* Resume Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  简历标题
                </label>
                <input
                  type="text"
                  value={resumeData.title}
                  onChange={(e) => setResumeData({...resumeData, title: e.target.value})}
                  className="input-field"
                  placeholder="例如：软件工程师简历"
                />
              </div>

              {/* Template Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  选择模板
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="input-field"
                >
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name} - {template.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Personal Information */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">个人信息</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                    <input
                      type="text"
                      value={resumeData.content.personal.name}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        content: {
                          ...resumeData.content,
                          personal: { ...resumeData.content.personal, name: e.target.value }
                        }
                      })}
                      className="input-field"
                      placeholder="您的姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                    <input
                      type="email"
                      value={resumeData.content.personal.email}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        content: {
                          ...resumeData.content,
                          personal: { ...resumeData.content.personal, email: e.target.value }
                        }
                      })}
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
                    <input
                      type="tel"
                      value={resumeData.content.personal.phone}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        content: {
                          ...resumeData.content,
                          personal: { ...resumeData.content.personal, phone: e.target.value }
                        }
                      })}
                      className="input-field"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">地址</label>
                    <input
                      type="text"
                      value={resumeData.content.personal.location}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        content: {
                          ...resumeData.content,
                          personal: { ...resumeData.content.personal, location: e.target.value }
                        }
                      })}
                      className="input-field"
                      placeholder="城市，州/省"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">个人简介</h3>
                <textarea
                  value={resumeData.content.summary}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    content: { ...resumeData.content, summary: e.target.value }
                  })}
                  className="input-field"
                  rows={4}
                  placeholder="简要介绍您的专业背景、技能和目标..."
                />
                {!isLoggedIn && (
                  <p className="text-sm text-gray-500 mt-2">
                    💡 注册后可使用AI助手自动生成个人简介
                  </p>
                )}
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">工作经验</h3>
                <div className="space-y-4">
                  {resumeData.content.experience.map((exp, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="职位名称"
                          className="input-field"
                        />
                        <input
                          type="text"
                          placeholder="公司名称"
                          className="input-field"
                        />
                        <input
                          type="text"
                          placeholder="开始日期"
                          className="input-field"
                        />
                        <input
                          type="text"
                          placeholder="结束日期"
                          className="input-field"
                        />
                      </div>
                      <textarea
                        placeholder="工作描述..."
                        className="input-field mt-4"
                        rows={3}
                      />
                    </div>
                  ))}
                  <button className="btn-secondary w-full">
                    + 添加工作经验
                  </button>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">技能</h3>
                <textarea
                  value={resumeData.content.skills.join(', ')}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    content: { 
                      ...resumeData.content, 
                      skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    }
                  })}
                  className="input-field"
                  rows={3}
                  placeholder="技能1, 技能2, 技能3..."
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">简历预览</h3>
              <div className="bg-gray-100 rounded-lg p-4 h-96 overflow-y-auto">
                <div className="bg-white rounded p-4">
                  <h4 className="font-bold text-lg mb-2">{resumeData.content.personal.name || '您的姓名'}</h4>
                  <p className="text-gray-600 mb-2">{resumeData.content.personal.email || 'your@email.com'}</p>
                  <p className="text-gray-600 mb-4">{resumeData.content.personal.phone || '+1 (555) 123-4567'}</p>
                  
                  {resumeData.content.summary && (
                    <div className="mb-4">
                      <h5 className="font-semibold mb-1">个人简介</h5>
                      <p className="text-sm text-gray-700">{resumeData.content.summary}</p>
                    </div>
                  )}
                  
                  {resumeData.content.skills.length > 0 && (
                    <div>
                      <h5 className="font-semibold mb-1">技能</h5>
                      <div className="flex flex-wrap gap-1">
                        {resumeData.content.skills.map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {!isLoggedIn && (
              <div className="card mt-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <h3 className="text-lg font-semibold mb-2 text-blue-900">升级到完整版</h3>
                <ul className="text-sm text-blue-800 space-y-1 mb-4">
                  <li>✓ 保存无限份简历</li>
                  <li>✓ AI智能写作助手</li>
                  <li>✓ 多语言简历支持</li>
                  <li>✓ 简历分析和优化建议</li>
                  <li>✓ 导出PDF/Word格式</li>
                </ul>
                <Link href="/auth/register" className="btn-primary w-full">
                  立即注册
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 