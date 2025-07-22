'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { Header } from '@/components/Header'
import { GlobeAltIcon, CogIcon } from '@heroicons/react/24/outline'
import LanguageSelector from '@/components/LanguageSelector'

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  isActive: boolean
}

interface Resume {
  id: string
  title: string
  language: string
  translations: Record<string, any>
  updatedAt: string
}

export default function MultilanguageSettingsPage() {
  const { t, i18n } = useTranslation()
  const [languages, setLanguages] = useState<Language[]>([])
  const [resumes, setResumes] = useState<Resume[]>([])
  const [userLanguage, setUserLanguage] = useState('en-US')
  const [isLoading, setIsLoading] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)

  // Load supported languages
  const loadLanguages = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/multilanguage/languages`)
      if (response.ok) {
        const data = await response.json()
        setLanguages(data)
      }
    } catch (error) {
      toast.error('Failed to load languages')
    }
  }

  // Load user's preferred language
  const loadUserLanguage = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/multilanguage/user/language`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setUserLanguage(data.language)
      }
    } catch (error) {
      console.error('Failed to load user language preference')
    }
  }

  // Load user's resumes
  const loadResumes = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setResumes(data)
      }
    } catch (error) {
      toast.error('Failed to load resumes')
    }
  }

  // Update user's preferred language
  const updateUserLanguage = async (language: string) => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/multilanguage/user/language`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ language })
      })

      if (response.ok) {
        setUserLanguage(language)
        i18n.changeLanguage(language)
        toast.success('Language preference updated')
      } else {
        toast.error('Failed to update language preference')
      }
    } catch (error) {
      toast.error('Network error')
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-translate all resumes
  const handleAutoTranslateAll = async () => {
    setIsTranslating(true)
    try {
      const token = localStorage.getItem('token')
      
      for (const resume of resumes) {
        // Get the original content
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/multilanguage/resume/${resume.id}/${resume.language}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const data = await response.json()
          const originalContent = data.content

          // Translate to other languages
          const otherLanguages = languages.filter(lang => lang.code !== resume.language)
          
          for (const language of otherLanguages) {
            const translateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/translate`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                content: JSON.stringify(originalContent),
                sourceLanguage: resume.language,
                targetLanguage: language.code
              })
            })

            if (translateResponse.ok) {
              const translateData = await translateResponse.json()
              const translatedContent = JSON.parse(translateData.translatedContent)
              
              // Save translation
              await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/multilanguage/resume/${resume.id}/translations`, {
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
        }
      }
      
      toast.success('All resumes translated successfully')
      loadResumes() // Reload resumes to show updated translations
    } catch (error) {
      toast.error('Auto-translation failed')
    } finally {
      setIsTranslating(false)
    }
  }

  useEffect(() => {
    loadLanguages()
    loadUserLanguage()
    loadResumes()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={t('settings.multilanguage')} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {t('settings.multilanguage')} / Multilanguage Settings
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage your language preferences and resume translations
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <button
                  onClick={handleAutoTranslateAll}
                  disabled={isTranslating}
                  className="btn-primary flex items-center space-x-2"
                >
                  <GlobeAltIcon className="h-4 w-4" />
                  <span>{isTranslating ? 'Translating...' : 'Auto Translate All'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Language Preferences */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-2 mb-4">
                <GlobeAltIcon className="h-5 w-5 text-primary-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  {t('settings.languagePreferences')} / Language Preferences
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('settings.preferredLanguage')} / Preferred Language
                  </label>
                  <select
                    value={userLanguage}
                    onChange={(e) => updateUserLanguage(e.target.value)}
                    disabled={isLoading}
                    className="form-select w-full"
                  >
                    {languages.map((language) => (
                      <option key={language.code} value={language.code}>
                        {language.flag} {language.nativeName} ({language.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-900 mb-2">
                    {t('settings.languageInfo')} / Language Information
                  </h3>
                  <p className="text-sm text-blue-700">
                    Your preferred language will be used as the default language for new resumes and the interface language.
                  </p>
                </div>
              </div>
            </div>

            {/* Supported Languages */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CogIcon className="h-5 w-5 text-primary-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  {t('settings.supportedLanguages')} / Supported Languages
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {languages.map((language) => (
                  <div
                    key={language.code}
                    className={`p-3 rounded-lg border-2 ${
                      language.isActive
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{language.flag}</span>
                      <div>
                        <div className="text-sm font-medium">{language.nativeName}</div>
                        <div className="text-xs text-gray-500">{language.name}</div>
                      </div>
                      <div className="ml-auto">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            language.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {language.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resume Translations */}
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {t('settings.resumeTranslations')} / Resume Translations
              </h2>
              <span className="text-sm text-gray-500">
                {resumes.length} {t('settings.resumes')} / resumes
              </span>
            </div>

            <div className="space-y-4">
              {resumes.map((resume) => (
                <div key={resume.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{resume.title}</h3>
                      <p className="text-sm text-gray-500">
                        {t('settings.originalLanguage')} / Original: {resume.language}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {new Date(resume.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {languages.map((language) => {
                      const hasTranslation = resume.translations && resume.translations[language.code]
                      return (
                        <div
                          key={language.code}
                          className={`p-2 rounded border text-center ${
                            hasTranslation
                              ? 'border-green-200 bg-green-50'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="text-lg mb-1">{language.flag}</div>
                          <div className="text-xs font-medium">{language.nativeName}</div>
                          <div className="text-xs text-gray-500">
                            {hasTranslation ? 'Translated' : 'Not translated'}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}

              {resumes.length === 0 && (
                <div className="text-center py-8">
                  <GlobeAltIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {t('settings.noResumes')} / No resumes found. Create your first resume to get started.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 