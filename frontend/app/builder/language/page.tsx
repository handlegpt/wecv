'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '@/components/LanguageSelector'
import MultiLanguageResume from '@/components/MultiLanguageResume'

// Sample resume data
const sampleResumeData = {
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    website: 'https://johndoe.com',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe'
  },
  experience: [
    {
      company: 'Tech Solutions Inc.',
      position: 'Senior Software Engineer',
      startDate: '2022-01-01',
      endDate: '2024-01-01',
      description: 'Led development of scalable web applications using React, Node.js, and AWS. Managed a team of 5 developers and improved application performance by 40%.'
    },
    {
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: '2020-06-01',
      endDate: '2021-12-31',
      description: 'Built and maintained web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality products.'
    }
  ],
  education: [
    {
      school: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2016-09-01',
      endDate: '2020-05-31',
      gpa: '3.8'
    }
  ],
  skills: [
    { name: 'JavaScript', level: 'Expert' },
    { name: 'React', level: 'Advanced' },
    { name: 'Node.js', level: 'Advanced' },
    { name: 'Python', level: 'Intermediate' },
    { name: 'AWS', level: 'Intermediate' },
    { name: 'Docker', level: 'Intermediate' }
  ],
  languages: [
    { name: 'English', proficiency: 'Native' },
    { name: 'Spanish', proficiency: 'Fluent' },
    { name: 'French', proficiency: 'Intermediate' }
  ],
  projects: [
    {
      name: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Implemented payment processing and inventory management.',
      url: 'https://github.com/johndoe/ecommerce'
    },
    {
      name: 'Task Management App',
      description: 'Developed a collaborative task management application with real-time updates and team collaboration features.',
      url: 'https://github.com/johndoe/taskmanager'
    }
  ]
}

export default function LanguageSettingsPage() {
  const { t } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState('en-US')
  const [resumeData, setResumeData] = useState(sampleResumeData)

  const languages = [
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'zh-CN', name: 'Chinese (Simplified)', flag: '🇨🇳' },
    { code: 'zh-TW', name: 'Chinese (Traditional)', flag: '🇹🇼' },
    { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
    { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
    { code: 'de-DE', name: 'German', flag: '🇩🇪' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('resume.multiLanguage', 'Multi-Language Resume')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('resume.languageDescription', 'Create and preview your resume in multiple languages. Switch between languages to see how your resume looks in different formats.')}
          </p>
        </div>

        {/* Language Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {t('resume.selectLanguage', 'Select Language')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => setSelectedLanguage(language.code)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedLanguage === language.code
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{language.flag}</div>
                  <div className="text-sm font-medium">{language.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Resume Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {t('resume.preview', 'Resume Preview')} - {languages.find(l => l.code === selectedLanguage)?.name}
            </h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                {t('buttons.export')}
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                {t('buttons.save')}
              </button>
            </div>
          </div>

          {/* Resume Content */}
          <div className="border rounded-lg overflow-hidden">
            <MultiLanguageResume
              data={resumeData}
              language={selectedLanguage}
              template="professional"
            />
          </div>
        </div>

        {/* Language Tips */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            {t('languageTips.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-700 mb-2">🇨🇳 {t('languageTips.simplifiedChinese.title')}</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                {(t('languageTips.simplifiedChinese.tips', { returnObjects: true }) as string[]).map((tip: string, index: number) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2">🇹🇼 {t('languageTips.traditionalChinese.title')}</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                {(t('languageTips.traditionalChinese.tips', { returnObjects: true }) as string[]).map((tip: string, index: number) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2">🇯🇵 {t('languageTips.japanese.title')}</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                {(t('languageTips.japanese.tips', { returnObjects: true }) as string[]).map((tip: string, index: number) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2">🇪🇸 {t('languageTips.spanish.title')}</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                {(t('languageTips.spanish.tips', { returnObjects: true }) as string[]).map((tip: string, index: number) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 