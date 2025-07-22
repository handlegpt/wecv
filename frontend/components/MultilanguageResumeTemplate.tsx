'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { GlobeAltIcon, ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'

interface MultilanguageResumeTemplateProps {
  resumeId: string
  content: any
  language: string
  template: string
  onLanguageChange: (language: string) => void
  onExport: (format: string, language: string) => void
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

export default function MultilanguageResumeTemplate({
  resumeId,
  content,
  language,
  template,
  onLanguageChange,
  onExport
}: MultilanguageResumeTemplateProps) {
  const { t } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(language)
  const [currentContent, setCurrentContent] = useState(content)
  const [isLoading, setIsLoading] = useState(false)

  // Load resume content for specific language
  const loadResumeContent = async (languageCode: string) => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/multilanguage/resume/${resumeId}/${languageCode}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setCurrentContent(data.content)
        setCurrentLanguage(languageCode)
        onLanguageChange(languageCode)
      }
    } catch (error) {
      console.error('Failed to load resume content')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLanguageChange = (languageCode: string) => {
    if (languageCode === currentLanguage) return
    loadResumeContent(languageCode)
  }

  const renderResumeContent = () => {
    if (!currentContent) return null

    return (
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentContent.personalInfo?.firstName} {currentContent.personalInfo?.lastName}
          </h1>
          <p className="text-lg text-gray-600 mb-4">{currentContent.personalInfo?.position}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            {currentContent.personalInfo?.email && (
              <span>{currentContent.personalInfo.email}</span>
            )}
            {currentContent.personalInfo?.phone && (
              <span>{currentContent.personalInfo.phone}</span>
            )}
            {currentContent.personalInfo?.location && (
              <span>{currentContent.personalInfo.location}</span>
            )}
          </div>
        </div>

        {/* Summary */}
        {currentContent.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t('resume.summary')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {currentContent.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {currentContent.experience && currentContent.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('resume.experience')}
            </h2>
            <div className="space-y-6">
              {currentContent.experience.map((exp: any, index: number) => (
                <div key={index} className="border-l-4 border-primary-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-500">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  <p className="text-primary-600 font-medium mb-2">{exp.company}</p>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {currentContent.education && currentContent.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('resume.education')}
            </h2>
            <div className="space-y-4">
              {currentContent.education.map((edu: any, index: number) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <span className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </span>
                  </div>
                  <p className="text-green-600 font-medium mb-2">{edu.school}</p>
                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {currentContent.skills && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('resume.skills')}
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">
                {currentContent.skills}
              </p>
            </div>
          </div>
        )}

        {/* Projects */}
        {currentContent.projects && currentContent.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('resume.projects')}
            </h2>
            <div className="space-y-4">
              {currentContent.projects.map((project: any, index: number) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
                  {project.url && (
                    <p className="text-blue-600 mb-2">
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        {project.url}
                      </a>
                    </p>
                  )}
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {currentContent.languages && currentContent.languages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('resume.languages')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {currentContent.languages.map((lang: any, index: number) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {lang.language} - {lang.proficiency}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {currentContent.certifications && currentContent.certifications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('resume.certifications')}
            </h2>
            <div className="space-y-2">
              {currentContent.certifications.map((cert: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{cert.name}</span>
                  <span className="text-sm text-gray-500">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {currentContent.interests && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('resume.interests')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {currentContent.interests}
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Language Selector */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GlobeAltIcon className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                {t('resume.language')} / Language
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    disabled={isLoading}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      currentLanguage === lang.code
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title={`${lang.nativeName} (${lang.name})`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                  </button>
                ))}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onExport('pdf', currentLanguage)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  <span>PDF</span>
                </button>
                <button
                  onClick={() => onExport('docx', currentLanguage)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  <span>DOCX</span>
                </button>
                <button
                  onClick={() => onExport('share', currentLanguage)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <ArrowUpTrayIcon className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Content */}
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          )}
          {renderResumeContent()}
        </div>
      </div>
    </div>
  )
} 