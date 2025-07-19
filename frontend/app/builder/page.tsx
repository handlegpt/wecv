'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import Link from 'next/link'
import LanguageSelector from '@/components/LanguageSelector'
import ResumeTemplateRenderer from '@/components/ResumeTemplateRenderer'

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
          { id: 'modern', name: t('templates.modern.name'), category: 'modern' },
          { id: 'classic', name: t('templates.classic.name'), category: 'classic' },
          { id: 'creative', name: t('templates.creative.name'), category: 'creative' },
          { id: 'minimal', name: t('templates.minimal.name'), category: 'minimal' }
        ]
        setTemplates(mockTemplates)
        setSelectedTemplate('modern')
      }
    } catch (error) {
      // 使用模拟数据作为后备
      const mockTemplates = [
        { id: 'modern', name: t('templates.modern.name'), category: 'modern' },
        { id: 'classic', name: t('templates.classic.name'), category: 'classic' },
        { id: 'creative', name: t('templates.creative.name'), category: 'creative' },
        { id: 'minimal', name: t('templates.minimal.name'), category: 'minimal' }
      ]
      setTemplates(mockTemplates)
      setSelectedTemplate('modern')
    }
  }

  const handleSave = async () => {
    if (!resumeData.title.trim()) {
      toast.error(t('builder.errors.titleRequired', 'Please enter a resume title'))
      return
    }

    if (!isLoggedIn) {
      // 如果未登录，提示用户注册
      toast.error(t('builder.errors.loginRequired', 'Please register to save your resume'))
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
        toast.success(t('builder.success.saved', 'Resume saved successfully!'))
        router.push('/dashboard')
      } else {
        toast.error(t('builder.errors.saveFailed', 'Save failed'))
      }
    } catch (error) {
      toast.error(t('builder.errors.networkError', 'Network error'))
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreview = () => {
    // 预览功能，不需要登录
    if (!resumeData.title.trim()) {
      toast.error(t('builder.errors.titleRequired', 'Please enter a resume title'))
      return
    }
    toast.success(t('builder.preview.developing', 'Preview feature is under development...'))
  }

  const handleAIAssist = async (section: string, prompt: string) => {
    if (!isLoggedIn) {
      toast.error(t('builder.errors.loginRequired', 'Please register to use AI features'))
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
        toast.success(t('builder.ai.completed', 'AI generation completed!'))
        return data.result
      } else {
        toast.error(t('builder.ai.failed', 'AI generation failed'))
      }
    } catch (error) {
      toast.error(t('builder.errors.networkError', 'Network error'))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">{t('builder.title', 'WeCV AI - Resume Builder')}</h1>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              {!isLoggedIn && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{t('builder.trialMode', 'Trial Mode')}</span>
                  <Link href="/auth/register" className="btn-primary">
                    {t('builder.registerToSave', 'Register to Save')}
                  </Link>
                </div>
              )}
              <button
                onClick={handlePreview}
                className="btn-secondary"
              >
                {t('builder.preview.button', 'Preview Resume')}
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? t('builder.saving', 'Saving...') : (isLoggedIn ? t('builder.save', 'Save Resume') : t('builder.registerToSave', 'Register to Save'))}
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
                  <strong>{t('builder.trialMode.title', 'Trial Mode:')}</strong> {t('builder.trialMode.description', 'You can freely experience the resume creation feature. Register an account to save resumes, use AI features, and more.')}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">{t('builder.basicInfo', 'Basic Information')}</h2>
              
              {/* Resume Title */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('builder.resumeTitle', 'Resume Title')}
                </label>
                <input
                  type="text"
                  value={resumeData.title}
                  onChange={(e) => setResumeData({...resumeData, title: e.target.value})}
                  className="input-field"
                  placeholder={t('builder.resumeTitle.placeholder', 'e.g., Software Engineer Resume')}
                />
              </div>

              {/* Template Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('builder.selectTemplate', 'Select Template')}
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
                <h3 className="text-lg font-medium mb-4">{t('builder.personalInfo', 'Personal Information')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.name', 'Name')}
                    </label>
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
                      placeholder={t('form.name.placeholder', 'Your full name')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.email', 'Email')}
                    </label>
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
                      placeholder={t('form.email.placeholder', 'your@email.com')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.phone', 'Phone')}
                    </label>
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
                      placeholder={t('form.phone.placeholder', '+1 (555) 123-4567')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('form.location', 'Location')}
                    </label>
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
                      placeholder={t('form.location.placeholder', 'City, State/Province')}
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('builder.summary', 'Professional Summary')}
                </label>
                <textarea
                  value={resumeData.content.summary}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    content: { 
                      ...resumeData.content, 
                      summary: e.target.value
                    }
                  })}
                  className="input-field"
                  rows={4}
                  placeholder={t('builder.summary.placeholder', 'Brief professional summary...')}
                />
              </div>

              {/* Skills */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('builder.skills', 'Skills')}
                </label>
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
                  placeholder={t('builder.skills.placeholder', 'Skill 1, Skill 2, Skill 3...')}
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">{t('builder.preview.title', 'Resume Preview')}</h3>
              <div className="bg-gray-100 rounded-lg p-4 h-96 overflow-y-auto">
                <ResumeTemplateRenderer 
                  resumeData={resumeData}
                  templateId={selectedTemplate}
                  className="w-full h-full"
                />
              </div>
            </div>

            {!isLoggedIn && (
              <div className="card mt-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <h3 className="text-lg font-semibold mb-2 text-blue-900">{t('builder.upgrade.title', 'Upgrade to Full Version')}</h3>
                <ul className="text-sm text-blue-800 space-y-1 mb-4">
                  <li>✓ {t('builder.upgrade.feature1', 'Save unlimited resumes')}</li>
                  <li>✓ {t('builder.upgrade.feature2', 'AI writing assistant')}</li>
                  <li>✓ {t('builder.upgrade.feature3', 'Multi-language resume support')}</li>
                  <li>✓ {t('builder.upgrade.feature4', 'Resume analysis and optimization')}</li>
                  <li>✓ {t('builder.upgrade.feature5', 'Export to PDF/Word format')}</li>
                </ul>
                <Link href="/auth/register" className="btn-primary w-full">
                  {t('builder.upgrade.registerNow', 'Register Now')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 