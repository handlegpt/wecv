'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import { GlobeAltIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'

interface MultilanguageResumeEditorProps {
  resumeId: string
  initialContent: any
  initialLanguage: string
  onSave: (content: any, language: string) => void
}

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

const supportedLanguages: Language[] = [
  { code: 'en-US', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '中文 (简体)', flag: '🇨🇳' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '中文 (繁體)', flag: '🇹🇼' },
  { code: 'ja-JP', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'es-ES', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de-DE', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' }
]

export default function MultilanguageResumeEditor({
  resumeId,
  initialContent,
  initialLanguage,
  onSave
}: MultilanguageResumeEditorProps) {
  const { t } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage)
  const [content, setContent] = useState(initialContent)
  const [translations, setTranslations] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)

  // Load resume content for specific language
  const loadResumeContent = async (language: string) => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/multilanguage/resume/${resumeId}/${language}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setContent(data.content)
        setCurrentLanguage(language)
      } else {
        toast.error('Failed to load resume content')
      }
    } catch (error) {
      toast.error('Network error')
    } finally {
      setIsLoading(false)
    }
  }

  // Save current content
  const handleSave = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/multilanguage/resume/${resumeId}/translations`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          translations: {
            [currentLanguage]: content
          }
        })
      })

      if (response.ok) {
        toast.success('Resume saved successfully')
        onSave(content, currentLanguage)
      } else {
        toast.error('Failed to save resume')
      }
    } catch (error) {
      toast.error('Network error')
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-translate content to other languages
  const handleAutoTranslate = async () => {
    setIsTranslating(true)
    try {
      const token = localStorage.getItem('token')
      const otherLanguages = supportedLanguages.filter(lang => lang.code !== currentLanguage)
      
      for (const language of otherLanguages) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/translate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            content: JSON.stringify(content),
            sourceLanguage: currentLanguage,
            targetLanguage: language.code
          })
        })

        if (response.ok) {
          const data = await response.json()
          const translatedContent = JSON.parse(data.translatedContent)
          
          // Save translation
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/multilanguage/resume/${resumeId}/translations`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              translations: {
                [language.code]: translatedContent
              }
            })
          })
        }
      }
      
      toast.success('Auto-translation completed')
    } catch (error) {
      toast.error('Auto-translation failed')
    } finally {
      setIsTranslating(false)
    }
  }

  // Update user's preferred language
  const updateUserLanguage = async (language: string) => {
    try {
      const token = localStorage.getItem('token')
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/multilanguage/user/language`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ language })
      })
    } catch (error) {
      console.error('Failed to update user language preference')
    }
  }

  const handleLanguageChange = async (language: string) => {
    if (language === currentLanguage) return
    
    await loadResumeContent(language)
    await updateUserLanguage(language)
  }

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {t('resume.language')} / Language
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleAutoTranslate}
              disabled={isTranslating}
              className="btn-secondary flex items-center space-x-2"
            >
              <GlobeAltIcon className="h-4 w-4" />
              <span>{isTranslating ? 'Translating...' : 'Auto Translate'}</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="btn-primary flex items-center space-x-2"
            >
              <DocumentDuplicateIcon className="h-4 w-4" />
              <span>{isLoading ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {supportedLanguages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              disabled={isLoading}
              className={`p-3 rounded-lg border-2 transition-all ${
                currentLanguage === language.code
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{language.flag}</div>
                <div className="text-xs font-medium">{language.nativeName}</div>
                <div className="text-xs text-gray-500">{language.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Editor */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {t('resume.content')} ({supportedLanguages.find(l => l.code === currentLanguage)?.nativeName})
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <GlobeAltIcon className="h-4 w-4" />
            <span>{currentLanguage}</span>
          </div>
        </div>

        <div className="space-y-4">
          {/* Personal Information */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">{t('resume.personalInfo')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t('form.firstName')}
                value={content.personalInfo?.firstName || ''}
                onChange={(e) => setContent({
                  ...content,
                  personalInfo: { ...content.personalInfo, firstName: e.target.value }
                })}
                className="form-input"
              />
              <input
                type="text"
                placeholder={t('form.lastName')}
                value={content.personalInfo?.lastName || ''}
                onChange={(e) => setContent({
                  ...content,
                  personalInfo: { ...content.personalInfo, lastName: e.target.value }
                })}
                className="form-input"
              />
              <input
                type="email"
                placeholder={t('form.email')}
                value={content.personalInfo?.email || ''}
                onChange={(e) => setContent({
                  ...content,
                  personalInfo: { ...content.personalInfo, email: e.target.value }
                })}
                className="form-input"
              />
              <input
                type="tel"
                placeholder={t('form.phone')}
                value={content.personalInfo?.phone || ''}
                onChange={(e) => setContent({
                  ...content,
                  personalInfo: { ...content.personalInfo, phone: e.target.value }
                })}
                className="form-input"
              />
            </div>
          </div>

          {/* Summary */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">{t('resume.summary')}</h4>
            <textarea
              placeholder={t('resume.summaryPlaceholder')}
              value={content.summary || ''}
              onChange={(e) => setContent({ ...content, summary: e.target.value })}
              rows={4}
              className="form-textarea"
            />
          </div>

          {/* Experience */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">{t('resume.experience')}</h4>
            {content.experience?.map((exp: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <input
                    type="text"
                    placeholder={t('form.company')}
                    value={exp.company || ''}
                    onChange={(e) => {
                      const newExperience = [...content.experience]
                      newExperience[index] = { ...exp, company: e.target.value }
                      setContent({ ...content, experience: newExperience })
                    }}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder={t('form.position')}
                    value={exp.position || ''}
                    onChange={(e) => {
                      const newExperience = [...content.experience]
                      newExperience[index] = { ...exp, position: e.target.value }
                      setContent({ ...content, experience: newExperience })
                    }}
                    className="form-input"
                  />
                </div>
                <textarea
                  placeholder={t('form.description')}
                  value={exp.description || ''}
                  onChange={(e) => {
                    const newExperience = [...content.experience]
                    newExperience[index] = { ...exp, description: e.target.value }
                    setContent({ ...content, experience: newExperience })
                  }}
                  rows={3}
                  className="form-textarea"
                />
              </div>
            ))}
          </div>

          {/* Education */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">{t('resume.education')}</h4>
            {content.education?.map((edu: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <input
                    type="text"
                    placeholder={t('form.school')}
                    value={edu.school || ''}
                    onChange={(e) => {
                      const newEducation = [...content.education]
                      newEducation[index] = { ...edu, school: e.target.value }
                      setContent({ ...content, education: newEducation })
                    }}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder={t('form.degree')}
                    value={edu.degree || ''}
                    onChange={(e) => {
                      const newEducation = [...content.education]
                      newEducation[index] = { ...edu, degree: e.target.value }
                      setContent({ ...content, education: newEducation })
                    }}
                    className="form-input"
                  />
                </div>
                <textarea
                  placeholder={t('form.description')}
                  value={edu.description || ''}
                  onChange={(e) => {
                    const newEducation = [...content.education]
                    newEducation[index] = { ...edu, description: e.target.value }
                    setContent({ ...content, education: newEducation })
                  }}
                  rows={3}
                  className="form-textarea"
                />
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">{t('resume.skills')}</h4>
            <textarea
              placeholder={t('resume.skillsPlaceholder')}
              value={content.skills || ''}
              onChange={(e) => setContent({ ...content, skills: e.target.value })}
              rows={3}
              className="form-textarea"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 