'use client'

import { useState } from 'react'

interface ResumePreviewProps {
  resumeData: any
  templateId?: string
  className?: string
}

export default function ResumePreview({ resumeData, templateId, className = '' }: ResumePreviewProps) {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile' | 'print'>('desktop')

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate resumeData={resumeData} />
      case 'classic':
        return <ClassicTemplate resumeData={resumeData} />
      case 'creative':
        return <CreativeTemplate resumeData={resumeData} />
      default:
        return <ModernTemplate resumeData={resumeData} />
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Preview Controls */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">简历预览</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`px-3 py-1 text-sm rounded ${
                previewMode === 'desktop' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              桌面
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`px-3 py-1 text-sm rounded ${
                previewMode === 'mobile' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              手机
            </button>
            <button
              onClick={() => setPreviewMode('print')}
              className={`px-3 py-1 text-sm rounded ${
                previewMode === 'print' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              打印
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className={`p-6 ${
        previewMode === 'mobile' ? 'max-w-sm mx-auto' : 
        previewMode === 'print' ? 'max-w-4xl mx-auto' : 
        'max-w-2xl mx-auto'
      }`}>
        <div className={`bg-white ${
          previewMode === 'mobile' ? 'w-full' : 
          previewMode === 'print' ? 'min-h-[297mm]' : 
          'min-h-[842px]'
        }`}>
          {renderTemplate()}
        </div>
      </div>
    </div>
  )
}

// 现代模板
function ModernTemplate({ resumeData }: { resumeData: any }) {
  return (
    <div className="p-8 font-sans">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {resumeData.content?.personal?.name || '姓名'}
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          {resumeData.content?.personal?.title || '职位'}
        </p>
        <div className="flex justify-center space-x-4 text-sm text-gray-500">
          <span>{resumeData.content?.personal?.email || '邮箱'}</span>
          <span>{resumeData.content?.personal?.phone || '电话'}</span>
          <span>{resumeData.content?.personal?.location || '地址'}</span>
        </div>
      </div>

      {/* Summary */}
      {resumeData.content?.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-primary-600 pb-1">
            个人简介
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {resumeData.content.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {resumeData.content?.experience && resumeData.content.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-primary-600 pb-1">
            工作经历
          </h2>
          <div className="space-y-4">
            {resumeData.content.experience.map((exp: any, index: number) => (
              <div key={index} className="border-l-4 border-primary-600 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                </div>
                <p className="text-gray-600 mb-2">{exp.company}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resumeData.content?.education && resumeData.content.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-primary-600 pb-1">
            教育背景
          </h2>
          <div className="space-y-4">
            {resumeData.content.education.map((edu: any, index: number) => (
              <div key={index} className="border-l-4 border-primary-600 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">{edu.period}</span>
                </div>
                <p className="text-gray-600 mb-2">{edu.school}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.content?.skills && resumeData.content.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-primary-600 pb-1">
            技能专长
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.content.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// 经典模板
function ClassicTemplate({ resumeData }: { resumeData: any }) {
  return (
    <div className="p-8 font-serif">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-300 pb-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {resumeData.content?.personal?.name || '姓名'}
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          {resumeData.content?.personal?.title || '职位'}
        </p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>{resumeData.content?.personal?.email || '邮箱'}</p>
          <p>{resumeData.content?.personal?.phone || '电话'}</p>
          <p>{resumeData.content?.personal?.location || '地址'}</p>
        </div>
      </div>

      {/* Summary */}
      {resumeData.content?.summary && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">个人简介</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {resumeData.content.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {resumeData.content?.experience && resumeData.content.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">工作经历</h2>
          <div className="space-y-4">
            {resumeData.content.experience.map((exp: any, index: number) => (
              <div key={index} className="border-l-4 border-gray-400 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                </div>
                <p className="text-lg text-gray-600 mb-2 italic">{exp.company}</p>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resumeData.content?.education && resumeData.content.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">教育背景</h2>
          <div className="space-y-4">
            {resumeData.content.education.map((edu: any, index: number) => (
              <div key={index} className="border-l-4 border-gray-400 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">{edu.period}</span>
                </div>
                <p className="text-lg text-gray-600 mb-2 italic">{edu.school}</p>
                <p className="text-gray-700 leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.content?.skills && resumeData.content.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">技能专长</h2>
          <div className="grid grid-cols-2 gap-4">
            {resumeData.content.skills.map((skill: string, index: number) => (
              <div key={index} className="flex items-center">
                <span className="w-2 h-2 bg-gray-600 rounded-full mr-3"></span>
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// 创意模板
function CreativeTemplate({ resumeData }: { resumeData: any }) {
  return (
    <div className="p-8 font-sans bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {resumeData.content?.personal?.name || '姓名'}
        </h1>
        <p className="text-xl mb-4 opacity-90">
          {resumeData.content?.personal?.title || '职位'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {resumeData.content?.personal?.email || '邮箱'}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {resumeData.content?.personal?.phone || '电话'}
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {resumeData.content?.personal?.location || '地址'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary */}
          {resumeData.content?.summary && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-1 bg-primary-600 rounded mr-3"></span>
                个人简介
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {resumeData.content.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {resumeData.content?.experience && resumeData.content.experience.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-1 bg-primary-600 rounded mr-3"></span>
                工作经历
              </h2>
              <div className="space-y-6">
                {resumeData.content.experience.map((exp: any, index: number) => (
                  <div key={index} className="relative pl-6 border-l-2 border-primary-200">
                    <div className="absolute w-3 h-3 bg-primary-600 rounded-full -left-1.5 top-2"></div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2 font-medium">{exp.company}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resumeData.content?.education && resumeData.content.education.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-1 bg-primary-600 rounded mr-3"></span>
                教育背景
              </h2>
              <div className="space-y-6">
                {resumeData.content.education.map((edu: any, index: number) => (
                  <div key={index} className="relative pl-6 border-l-2 border-primary-200">
                    <div className="absolute w-3 h-3 bg-primary-600 rounded-full -left-1.5 top-2"></div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2 font-medium">{edu.school}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skills */}
          {resumeData.content?.skills && resumeData.content.skills.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-1 bg-primary-600 rounded mr-3"></span>
                技能专长
              </h2>
              <div className="space-y-3">
                {resumeData.content.skills.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 