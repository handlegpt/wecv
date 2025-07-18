'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ResumeData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    website?: string
    linkedin?: string
    github?: string
  }
  experience: Array<{
    company: string
    position: string
    startDate: string
    endDate?: string
    description: string
  }>
  education: Array<{
    school: string
    degree: string
    field: string
    startDate: string
    endDate?: string
    gpa?: string
  }>
  skills: Array<{
    name: string
    level: string
  }>
  languages: Array<{
    name: string
    proficiency: string
  }>
  projects: Array<{
    name: string
    description: string
    url?: string
  }>
}

interface MultiLanguageResumeProps {
  data: ResumeData
  language: string
  template: string
}

export default function MultiLanguageResume({ data, language, template }: MultiLanguageResumeProps) {
  const { t } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(language)

  // Language-specific formatting
  const formatDate = (date: string, lang: string) => {
    const dateObj = new Date(date)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long'
    }
    
    return dateObj.toLocaleDateString(lang, options)
  }

  const formatName = (firstName: string, lastName: string, lang: string) => {
    if (lang.startsWith('zh') || lang.startsWith('ja')) {
      return `${lastName} ${firstName}`
    }
    return `${firstName} ${lastName}`
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">
            {formatName(data.personalInfo.firstName, data.personalInfo.lastName, currentLanguage)}
          </h1>
          <p className="text-xl opacity-90">{data.personalInfo.email}</p>
          <p className="text-lg opacity-80">{data.personalInfo.phone}</p>
          {data.personalInfo.website && (
            <p className="text-lg opacity-80">{data.personalInfo.website}</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t('resume.personalInfo')}
            </h2>
            <div className="space-y-2 text-gray-600">
              <p><strong>{t('form.address')}:</strong> {data.personalInfo.address}</p>
              {data.personalInfo.linkedin && (
                <p><strong>LinkedIn:</strong> {data.personalInfo.linkedin}</p>
              )}
              {data.personalInfo.github && (
                <p><strong>GitHub:</strong> {data.personalInfo.github}</p>
              )}
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex justify-end">
            <div className="flex space-x-2">
              {['en-US', 'zh-CN', 'zh-TW', 'ja-JP', 'es-ES', 'fr-FR', 'de-DE'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLanguage(lang)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    currentLanguage === lang
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {lang === 'en-US' && '🇺🇸 EN'}
                  {lang === 'zh-CN' && '🇨🇳 简'}
                  {lang === 'zh-TW' && '🇹🇼 繁'}
                  {lang === 'ja-JP' && '🇯🇵 JP'}
                  {lang === 'es-ES' && '🇪🇸 ES'}
                  {lang === 'fr-FR' && '🇫🇷 FR'}
                  {lang === 'de-DE' && '🇩🇪 DE'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {t('resume.experience')}
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.startDate, currentLanguage)} - {exp.endDate ? formatDate(exp.endDate, currentLanguage) : t('form.present', 'Present')}
                  </span>
                </div>
                <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                <p className="text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {t('resume.education')}
          </h2>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-green-600 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(edu.startDate, currentLanguage)} - {edu.endDate ? formatDate(edu.endDate, currentLanguage) : t('form.present', 'Present')}
                  </span>
                </div>
                <p className="text-green-600 font-medium mb-2">{edu.school}</p>
                <p className="text-gray-600">{edu.field}</p>
                {edu.gpa && (
                  <p className="text-gray-600">{t('form.gpa')}: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {t('resume.skills')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium text-gray-700">{skill.name}</span>
                <span className="text-sm text-gray-500">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t('resume.languages')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{lang.name}</span>
                  <span className="text-sm text-gray-500">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t('resume.projects')}
            </h2>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={index} className="border-l-4 border-purple-600 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-2">{project.description}</p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 text-sm"
                    >
                      {t('form.projectUrl')}: {project.url}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 