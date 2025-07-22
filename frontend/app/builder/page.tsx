'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, Upload, Eye, Save, Download } from 'lucide-react'
import { Header } from '@/components/Header'
import toast from 'react-hot-toast'
import ResumeTemplateRenderer from '@/components/ResumeTemplateRenderer'
import { useRef } from 'react'

interface Template {
  id: string
  name: string
  category: string
}

export default function BuilderPage() {
  const { t } = useTranslation()
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [resumeData, setResumeData] = useState({
    title: '',
    content: {
      personal: { name: '', email: '', phone: '', location: '', title: '' },
      summary: '',
      experience: [] as Array<{
        title: string
        company: string
        location: string
        period: string
        description: string
      }>,
      education: [] as Array<{
        degree: string
        school: string
        period: string
        description: string
      }>,
      skills: [] as string[]
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const [aiLoading, setAiLoading] = useState<{ [key: string]: boolean }>({})
  const [aiError, setAiError] = useState<{ [key: string]: string }>({})
  const [showTranslateModal, setShowTranslateModal] = useState<{ key: string, value: string } | null>(null)
  const [translateLoading, setTranslateLoading] = useState(false)
  const [translateResult, setTranslateResult] = useState('')
  const [translateLang, setTranslateLang] = useState('en')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        setIsLoggedIn(true)
      } catch (error) {
        console.error('Failed to parse user data:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsLoggedIn(false)
      }
    } else {
      setIsLoggedIn(false)
    }
    
    // Get template ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const templateParam = urlParams.get('template')
    
    fetchTemplates(templateParam || undefined)
  }, [])

  // Handle file upload for resume import
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      if (file.type === 'application/json') {
        // Handle JSON file upload
        const text = await file.text()
        const jsonData = JSON.parse(text)
        
        // Validate and parse JSON resume data
        if (jsonData.title && jsonData.content) {
          setResumeData({
            title: jsonData.title,
            content: {
              personal: jsonData.content.personal || { name: '', email: '', phone: '', location: '', title: '' },
              summary: jsonData.content.summary || '',
              experience: jsonData.content.experience || [],
              education: jsonData.content.education || [],
              skills: jsonData.content.skills || []
            }
          })
          toast.success(t('builder.upload.jsonSuccess', 'JSON resume imported successfully!'))
        } else {
          toast.error(t('builder.upload.invalidJson', 'Invalid JSON format'))
        }
      } else if (file.type === 'application/pdf') {
        // Handle PDF file upload
        const formData = new FormData()
        formData.append('file', file)
        
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        })

        if (response.ok) {
          const data = await response.json()
          setResumeData({
            title: data.title || 'Imported Resume',
            content: data.content
          })
          toast.success(t('builder.upload.pdfSuccess', 'PDF resume imported successfully!'))
        } else {
          toast.error(t('builder.upload.pdfFailed', 'Failed to import PDF resume'))
        }
      } else {
        toast.error(t('builder.upload.unsupportedFormat', 'Unsupported file format. Please upload PDF or JSON files.'))
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(t('builder.upload.error', 'Upload failed'))
    } finally {
      setIsUploading(false)
      setShowUploadModal(false)
    }
  }

  // Export current resume as JSON
  const handleExportJSON = () => {
    const jsonData = {
      title: resumeData.title,
      content: resumeData.content,
      templateId: selectedTemplate
    }
    
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${resumeData.title || 'resume'}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success(t('builder.export.jsonSuccess', 'Resume exported as JSON!'))
  }

  const fetchTemplates = async (templateId?: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/template`)
      if (response.ok) {
        const data = await response.json()
        setTemplates(data)
        if (data.length > 0) {
          setSelectedTemplate(templateId || data[0].id)
        }
      } else {
        // Use mock data as fallback
        const mockTemplates = [
          { id: 'modern', name: t('templates.modern.name'), category: 'modern' },
          { id: 'classic', name: t('templates.classic.name'), category: 'classic' },
          { id: 'creative', name: t('templates.creative.name'), category: 'creative' },
          { id: 'minimal', name: t('templates.minimal.name'), category: 'minimal' },
          { id: 'impact', name: t('templates.impact.name'), category: 'executive' },
          { id: 'clean', name: t('templates.clean.name'), category: 'professional' },
          { id: 'contemporary', name: t('templates.contemporary.name'), category: 'modern' },
          { id: 'executive', name: t('templates.executive.name'), category: 'executive' },
          { id: 'elegant', name: t('templates.elegant.name'), category: 'creative' },
          { id: 'simple', name: t('templates.simple.name'), category: 'minimal' }
        ]
        setTemplates(mockTemplates)
        setSelectedTemplate(templateId || 'modern')
      }
    } catch (error) {
      // Use mock data as fallback
      const mockTemplates = [
        { id: 'modern', name: t('templates.modern.name'), category: 'modern' },
        { id: 'classic', name: t('templates.classic.name'), category: 'classic' },
        { id: 'creative', name: t('templates.creative.name'), category: 'creative' },
        { id: 'minimal', name: t('templates.minimal.name'), category: 'minimal' },
        { id: 'impact', name: t('templates.impact.name'), category: 'executive' },
        { id: 'clean', name: t('templates.clean.name'), category: 'professional' },
        { id: 'contemporary', name: t('templates.contemporary.name'), category: 'modern' },
        { id: 'executive', name: t('templates.executive.name'), category: 'executive' },
        { id: 'elegant', name: t('templates.elegant.name'), category: 'creative' },
        { id: 'simple', name: t('templates.simple.name'), category: 'minimal' }
      ]
      setTemplates(mockTemplates)
      setSelectedTemplate(templateId || 'modern')
    }
  }

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    
    // Update URL parameters
    const url = new URL(window.location.href)
    url.searchParams.set('template', templateId)
    window.history.replaceState({}, '', url.toString())
  }

  const handleSave = async () => {
    if (!resumeData.title.trim()) {
      toast.error(t('builder.errors.titleRequired', 'Please enter a resume title'))
      return
    }

    if (!isLoggedIn) {
      // If not logged in, prompt user to register
      toast.error(t('builder.errors.loginRequired', 'Please register to save your resume'))
      router.push('/auth/register')
      return
    }

    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume`, {
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
    // Preview function, no login required
    if (!resumeData.title.trim()) {
      toast.error(t('builder.errors.titleRequired', 'Please enter a resume title'))
      return
    }
    setShowPreviewModal(true)
  }

  const handleAIAssist = async (section: string, prompt: string) => {
    if (!isLoggedIn) {
      toast.error(t('builder.errors.loginRequired', 'Please register to use AI features'))
      router.push('/auth/register')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/write`, {
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

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      content: {
        ...resumeData.content,
        experience: [
          ...resumeData.content.experience,
          {
            title: '',
            company: '',
            location: '',
            period: '',
            description: ''
          }
        ]
      }
    })
  }

  const removeExperience = (index: number) => {
    setResumeData({
      ...resumeData,
      content: {
        ...resumeData.content,
        experience: resumeData.content.experience.filter((_, i) => i !== index)
      }
    })
  }

  const updateExperience = (index: number, field: string, value: string) => {
    const updatedExperience = [...resumeData.content.experience]
    updatedExperience[index] = { ...updatedExperience[index], [field]: value }
    setResumeData({
      ...resumeData,
      content: {
        ...resumeData.content,
        experience: updatedExperience
      }
    })
  }

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      content: {
        ...resumeData.content,
        education: [
          ...resumeData.content.education,
          {
            degree: '',
            school: '',
            period: '',
            description: ''
          }
        ]
      }
    })
  }

  const removeEducation = (index: number) => {
    setResumeData({
      ...resumeData,
      content: {
        ...resumeData.content,
        education: resumeData.content.education.filter((_, i) => i !== index)
      }
    })
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...resumeData.content.education]
    updatedEducation[index] = { ...updatedEducation[index], [field]: value }
    setResumeData({
      ...resumeData,
      content: {
        ...resumeData.content,
        education: updatedEducation
      }
    })
  }

  // AI润色通用方法
  const handleEnhance = async (key: string, value: string, onResult: (v: string) => void) => {
    setAiLoading(l => ({ ...l, [key]: true }))
    setAiError(e => ({ ...e, [key]: '' }))
    try {
      const res = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: value, lang: 'zh' })
      })
      if (res.ok) {
        const data = await res.json()
        onResult(data.enhanced || value)
      } else {
        setAiError(e => ({ ...e, [key]: 'AI润色失败' }))
      }
    } catch {
      setAiError(e => ({ ...e, [key]: 'AI润色失败' }))
    } finally {
      setAiLoading(l => ({ ...l, [key]: false }))
    }
  }
  // AI翻译通用方法
  const handleTranslate = async (key: string, value: string, toLang: string, onResult: (v: string) => void) => {
    setTranslateLoading(true)
    setTranslateResult('')
    try {
      const res = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: value, toLang })
      })
      if (res.ok) {
        const data = await res.json()
        setTranslateResult(data.translated || value)
        onResult(data.translated || value)
      } else {
        setTranslateResult('AI翻译失败')
      }
    } catch {
      setTranslateResult('AI翻译失败')
    } finally {
      setTranslateLoading(false)
      setShowTranslateModal(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        {!isLoggedIn && (
          <div className="mb-4 sm:mb-6 bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start sm:items-center">
              <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-2 sm:ml-3">
                <p className="text-xs sm:text-sm text-blue-700">
                  <strong>{t('builder.trialMode.title', 'Trial Mode:')}</strong> {t('builder.trialMode.description', 'You can freely experience the resume creation feature. Register an account to save resumes, use AI features, and more.')}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Panel - Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-semibold">{t('builder.basicInfo', 'Basic Information')}</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="btn-secondary text-xs sm:text-sm py-1 sm:py-2 px-2 sm:px-3 flex items-center space-x-1"
                  >
                    <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{t('builder.upload.resume', 'Upload Resume')}</span>
                  </button>
                  <button
                    onClick={handlePreview}
                    className="btn-secondary text-xs sm:text-sm py-1 sm:py-2 px-2 sm:px-3 flex items-center space-x-1"
                  >
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{t('builder.previewTitle')}</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="btn-primary text-xs sm:text-sm py-1 sm:py-2 px-2 sm:px-3 flex items-center space-x-1"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                        <span>{t('builder.saving', 'Saving...')}</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{isLoggedIn ? t('builder.save', 'Save') : t('builder.saveAndRegister', 'Save & Register')}</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleExportJSON}
                    className="btn-secondary text-xs sm:text-sm py-1 sm:py-2 px-2 sm:px-3"
                  >
                    {t('builder.export.json', 'Export JSON')}
                  </button>
                </div>
              </div>
              
              {/* Resume Title */}
              <div className="mb-4 sm:mb-6">
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
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('builder.selectTemplate', 'Select Template')}
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="input-field"
                >
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {t(`templates.${template.id}.name`, template.name)} - {t(`templates.categories.${template.category}`, template.category)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Personal Information */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">{t('builder.personalInfo', 'Personal Information')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                      {t('form.title', 'Professional Title')}
                    </label>
                    <input
                      type="text"
                      value={resumeData.content.personal.title}
                      onChange={(e) => setResumeData({
                        ...resumeData,
                        content: { 
                          ...resumeData.content, 
                          personal: { ...resumeData.content.personal, title: e.target.value }
                        }
                      })}
                      className="input-field"
                      placeholder={t('form.title.placeholder', 'e.g., Software Engineer')}
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
                  <div className="sm:col-span-2">
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
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('builder.summary', 'Professional Summary')}
                </label>
                <div className="flex gap-2">
                  <textarea
                    value={resumeData.content.summary}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      content: { 
                        ...resumeData.content, 
                        summary: e.target.value
                      }
                    })}
                    className="input-field flex-1"
                    rows={4}
                    placeholder={t('builder.summary.placeholder', 'Brief professional summary...')}
                  />
                  <div className="flex flex-col gap-1">
                    <button
                      className="btn-secondary text-xs"
                      disabled={aiLoading.summary}
                      onClick={() => handleEnhance('summary', resumeData.content.summary, v => setResumeData({ ...resumeData, content: { ...resumeData.content, summary: v } }))}
                    >{aiLoading.summary ? '润色中...' : 'AI润色'}</button>
                    <button
                      className="btn-secondary text-xs"
                      onClick={() => setShowTranslateModal({ key: 'summary', value: resumeData.content.summary })}
                    >AI翻译</button>
                  </div>
                </div>
                {aiError.summary && <div className="text-red-500 text-xs mt-1">{aiError.summary}</div>}
              </div>

              {/* Skills */}
              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('builder.skills', 'Skills')}
                </label>
                <div className="flex gap-2">
                  <textarea
                    value={resumeData.content.skills.join(', ')}
                    onChange={(e) => setResumeData({
                      ...resumeData,
                      content: { 
                        ...resumeData.content, 
                        skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                      }
                    })}
                    className="input-field flex-1"
                    rows={3}
                    placeholder={t('builder.skills.placeholder', 'Skill 1, Skill 2, Skill 3...')}
                  />
                  <div className="flex flex-col gap-1">
                    <button
                      className="btn-secondary text-xs"
                      disabled={aiLoading.skills}
                      onClick={() => handleEnhance('skills', resumeData.content.skills.join(', '), v => setResumeData({ ...resumeData, content: { ...resumeData.content, skills: v.split(',').map(s => s.trim()).filter(s => s) } }))}
                    >{aiLoading.skills ? '润色中...' : 'AI润色'}</button>
                    <button
                      className="btn-secondary text-xs"
                      onClick={() => setShowTranslateModal({ key: 'skills', value: resumeData.content.skills.join(', ') })}
                    >AI翻译</button>
                  </div>
                </div>
                {aiError.skills && <div className="text-red-500 text-xs mt-1">{aiError.skills}</div>}
              </div>

              {/* Work Experience */}
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
                  <h3 className="text-base sm:text-lg font-medium">{t('builder.experience', 'Work Experience')}</h3>
                  <button
                    onClick={addExperience}
                    className="btn-secondary text-sm py-2 px-3 sm:px-4 w-full sm:w-auto"
                  >
                    + {t('builder.addExperience', 'Add Experience')}
                  </button>
                </div>
                
                {resumeData.content.experience.length === 0 ? (
                  <div className="text-center py-6 sm:py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-sm sm:text-base">{t('builder.noExperience', 'No work experience added yet')}</p>
                    <p className="text-xs sm:text-sm mt-2">{t('builder.clickAddExperience', 'Click "Add Experience" to get started')}</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {resumeData.content.experience.map((exp, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                          <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                            {t('builder.experience')} #{index + 1}
                          </h4>
                          <button
                            onClick={() => removeExperience(index)}
                            className="text-red-600 hover:text-red-800 text-xs sm:text-sm px-2 py-1 rounded hover:bg-red-50"
                          >
                            {t('builder.remove', 'Remove')}
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {t('builder.jobTitle', 'Job Title')}
                            </label>
                            <input
                              type="text"
                              value={exp.title}
                              onChange={(e) => updateExperience(index, 'title', e.target.value)}
                              className="input-field"
                              placeholder={t('builder.jobTitle.placeholder', 'e.g., Software Engineer')}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {t('builder.company', 'Company')}
                            </label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              className="input-field"
                              placeholder={t('builder.company.placeholder', 'e.g., Google Inc.')}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {t('builder.location', 'Location')}
                            </label>
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) => updateExperience(index, 'location', e.target.value)}
                              className="input-field"
                              placeholder={t('builder.location.placeholder', 'e.g., San Francisco, CA')}
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {t('builder.period', 'Period')}
                            </label>
                            <input
                              type="text"
                              value={exp.period}
                              onChange={(e) => updateExperience(index, 'period', e.target.value)}
                              className="input-field"
                              placeholder={t('builder.period.placeholder', 'e.g., Jan 2020 - Present')}
                            />
                          </div>
                        </div>
                        
                        <div className="mt-3 sm:mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('builder.description', 'Description')}
                          </label>
                          <div className="flex gap-2">
                            <textarea
                              value={exp.description}
                              onChange={(e) => updateExperience(index, 'description', e.target.value)}
                              className="input-field flex-1"
                              rows={3}
                              placeholder={t('builder.description.placeholder', 'Describe your responsibilities and achievements...')}
                            />
                            <div className="flex flex-col gap-1">
                              <button
                                className="btn-secondary text-xs"
                                disabled={aiLoading[`exp${index}`]}
                                onClick={() => handleEnhance(`exp${index}`, exp.description, v => updateExperience(index, 'description', v))}
                              >{aiLoading[`exp${index}`] ? '润色中...' : 'AI润色'}</button>
                              <button
                                className="btn-secondary text-xs"
                                onClick={() => setShowTranslateModal({ key: `exp${index}`, value: exp.description })}
                              >AI翻译</button>
                            </div>
                          </div>
                          {aiError[`exp${index}`] && <div className="text-red-500 text-xs mt-1">{aiError[`exp${index}`]}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Education */}
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
                  <h3 className="text-base sm:text-lg font-medium">{t('builder.education', 'Education')}</h3>
                  <button
                    onClick={addEducation}
                    className="btn-secondary text-sm py-2 px-3 sm:px-4 w-full sm:w-auto"
                  >
                    + {t('builder.addEducation', 'Add Education')}
                  </button>
                </div>
                
                {resumeData.content.education.length === 0 ? (
                  <div className="text-center py-6 sm:py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-sm sm:text-base">{t('builder.noEducation', 'No education added yet')}</p>
                    <p className="text-xs sm:text-sm mt-2">{t('builder.clickAddEducation', 'Click "Add Education" to get started')}</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {resumeData.content.education.map((edu, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                          <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                            {t('builder.education')} #{index + 1}
                          </h4>
                          <button
                            onClick={() => removeEducation(index)}
                            className="text-red-600 hover:text-red-800 text-xs sm:text-sm px-2 py-1 rounded hover:bg-red-50"
                          >
                            {t('builder.remove', 'Remove')}
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {t('builder.degree', 'Degree')}
                            </label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                              className="input-field"
                              placeholder={t('builder.degree.placeholder', 'e.g., Bachelor of Science in Computer Science')}
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {t('builder.school', 'School/University')}
                            </label>
                            <input
                              type="text"
                              value={edu.school}
                              onChange={(e) => updateEducation(index, 'school', e.target.value)}
                              className="input-field"
                              placeholder={t('builder.school.placeholder', 'e.g., Stanford University')}
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {t('builder.period', 'Period')}
                            </label>
                            <input
                              type="text"
                              value={edu.period}
                              onChange={(e) => updateEducation(index, 'period', e.target.value)}
                              className="input-field"
                              placeholder={t('builder.period.placeholder', 'e.g., 2016 - 2020')}
                            />
                          </div>
                        </div>
                        
                        <div className="mt-3 sm:mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('builder.description', 'Description')}
                          </label>
                          <div className="flex gap-2">
                            <textarea
                              value={edu.description}
                              onChange={(e) => updateEducation(index, 'description', e.target.value)}
                              className="input-field flex-1"
                              rows={3}
                              placeholder={t('builder.description.placeholder', 'Describe your studies, achievements, GPA...')}
                            />
                            <div className="flex flex-col gap-1">
                              <button
                                className="btn-secondary text-xs"
                                disabled={aiLoading[`edu${index}`]}
                                onClick={() => handleEnhance(`edu${index}`, edu.description, v => updateEducation(index, 'description', v))}
                              >{aiLoading[`edu${index}`] ? '润色中...' : 'AI润色'}</button>
                              <button
                                className="btn-secondary text-xs"
                                onClick={() => setShowTranslateModal({ key: `edu${index}`, value: edu.description })}
                              >AI翻译</button>
                            </div>
                          </div>
                          {aiError[`edu${index}`] && <div className="text-red-500 text-xs mt-1">{aiError[`edu${index}`]}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold">{t('builder.previewTitle')}</h3>
                <button
                  onClick={() => setShowPreviewModal(true)}
                  className="btn-secondary text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                  title={t('builder.previewZoom')}
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </button>
              </div>
              <div className="bg-gray-100 rounded-lg p-2 sm:p-4 h-[400px] sm:h-[500px] lg:h-[600px] overflow-y-auto">
                <ResumeTemplateRenderer 
                  resumeData={resumeData}
                  templateId={selectedTemplate}
                  className="w-full"
                />
              </div>
            </div>

            {!isLoggedIn && (
              <div className="card mt-3 sm:mt-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-blue-900">{t('builder.upgrade.title', 'Upgrade to Full Version')}</h3>
                <ul className="text-xs sm:text-sm text-blue-800 space-y-1 mb-3 sm:mb-4">
                  <li>✓ {t('builder.upgrade.feature1', 'Save unlimited resumes')}</li>
                  <li>✓ {t('builder.upgrade.feature2', 'AI writing assistant')}</li>
                  <li>✓ {t('builder.upgrade.feature3', 'Multi-language resume support')}</li>
                  <li>✓ {t('builder.upgrade.feature4', 'Resume analysis and optimization')}</li>
                  <li>✓ {t('builder.upgrade.feature5', 'Export to PDF/Word format')}</li>
                </ul>
                <Link href="/auth/register" className="btn-primary w-full text-sm py-2 px-3">
                  {t('builder.upgrade.registerNow', 'Register Now')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{t('builder.upload.title', 'Upload Resume')}</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                    disabled={isUploading}
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <div className="space-y-2">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-primary-600 hover:text-primary-500">
                          {isUploading ? t('builder.upload.uploading', 'Uploading...') : t('builder.upload.clickToUpload', 'Click to upload')}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {t('builder.upload.supportedFormats', 'PDF or JSON files up to 10MB')}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 text-center">
                <p>{t('builder.upload.pdfNote', 'PDF files will be processed to extract resume content')}</p>
                <p>{t('builder.upload.jsonNote', 'JSON files should contain resume data in our format')}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-3 sm:p-4 border-b">
              <h3 className="text-base sm:text-lg font-semibold">{t('builder.previewModalTitle')}</h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-3 sm:p-6 overflow-y-auto max-h-[calc(95vh-80px)] sm:max-h-[calc(90vh-120px)]">
              <ResumeTemplateRenderer 
                resumeData={resumeData}
                templateId={selectedTemplate}
                className="w-full max-w-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      )}

      {/* AI翻译弹窗 */}
      {showTranslateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">AI翻译</h3>
              <button onClick={() => setShowTranslateModal(null)} className="text-gray-500 hover:text-gray-700 p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">目标语言</label>
              <select className="input-field" value={translateLang} onChange={e => setTranslateLang(e.target.value)}>
                <option value="en">英文</option>
                <option value="zh">中文</option>
                <option value="ja">日文</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">原文</label>
              <textarea className="input-field" rows={3} value={showTranslateModal.value} readOnly />
            </div>
            <div className="mb-4">
              <button className="btn-primary w-full" disabled={translateLoading} onClick={() => handleTranslate(showTranslateModal.key, showTranslateModal.value, translateLang, v => {
                // 翻译结果直接填充到对应输入框
                if (showTranslateModal.key === 'summary') setResumeData({ ...resumeData, content: { ...resumeData.content, summary: v } })
                else if (showTranslateModal.key === 'skills') setResumeData({ ...resumeData, content: { ...resumeData.content, skills: v.split(',').map(s => s.trim()).filter(s => s) } })
                else if (showTranslateModal.key.startsWith('exp')) {
                  const idx = parseInt(showTranslateModal.key.replace('exp', ''))
                  const updated = [...resumeData.content.experience]
                  updated[idx].description = v
                  setResumeData({ ...resumeData, content: { ...resumeData.content, experience: updated } })
                } else if (showTranslateModal.key.startsWith('edu')) {
                  const idx = parseInt(showTranslateModal.key.replace('edu', ''))
                  const updated = [...resumeData.content.education]
                  updated[idx].description = v
                  setResumeData({ ...resumeData, content: { ...resumeData.content, education: updated } })
                }
              })}>{translateLoading ? '翻译中...' : '翻译'}</button>
            </div>
            {translateResult && <div className="text-green-600 text-sm mb-2">{translateResult}</div>}
          </div>
        </div>
      )}
    </div>
  )
} 