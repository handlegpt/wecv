'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { getTemplateStyle, TemplateStyle } from '@/lib/templates/template-config'
import { ResumeData } from '@/components/types/resume'

interface OptimizedTemplateRendererProps {
  templateId: string
  data: ResumeData
  className?: string
  showPreview?: boolean
  onTemplateChange?: (templateId: string) => void
}

export function OptimizedTemplateRenderer({
  templateId,
  data,
  className = '',
  showPreview = true,
  onTemplateChange
}: OptimizedTemplateRendererProps) {
  const templateStyle = useMemo(() => getTemplateStyle(templateId), [templateId])

  if (!templateStyle) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>Template not found: {templateId}</p>
      </div>
    )
  }

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate data={data} style={templateStyle} />
      case 'classic':
        return <ClassicTemplate data={data} style={templateStyle} />
      case 'creative':
        return <CreativeTemplate data={data} style={templateStyle} />
      case 'minimal':
        return <MinimalTemplate data={data} style={templateStyle} />
      case 'executive':
        return <ExecutiveTemplate data={data} style={templateStyle} />
      case 'impact':
        return <ImpactTemplate data={data} style={templateStyle} />
      case 'clean':
        return <CleanTemplate data={data} style={templateStyle} />
      case 'contemporary':
        return <ContemporaryTemplate data={data} style={templateStyle} />
      case 'elegant':
        return <ElegantTemplate data={data} style={templateStyle} />
      case 'simple':
        return <SimpleTemplate data={data} style={templateStyle} />
      case 'tech':
        return <TechTemplate data={data} style={templateStyle} />
      case 'artistic':
        return <ArtisticTemplate data={data} style={templateStyle} />
      case 'business':
        return <BusinessTemplate data={data} style={templateStyle} />
      case 'minimalist':
        return <MinimalistTemplate data={data} style={templateStyle} />
      default:
        return <ModernTemplate data={data} style={templateStyle} />
    }
  }

  return (
    <div className={cn(
      "bg-white rounded-lg shadow-lg overflow-hidden",
      "transition-all duration-300 ease-in-out",
      "hover:shadow-xl",
      className
    )}>
      {showPreview && (
        <div className="bg-gray-50 border-b border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Template:</span>
              <span className="text-sm font-semibold text-gray-900">{templateStyle.name}</span>
              <span className={cn(
                "px-2 py-1 text-xs rounded-full",
                templateStyle.difficulty === 'beginner' && "bg-green-100 text-green-800",
                templateStyle.difficulty === 'intermediate' && "bg-yellow-100 text-yellow-800",
                templateStyle.difficulty === 'advanced' && "bg-red-100 text-red-800"
              )}>
                {templateStyle.difficulty}
              </span>
            </div>
            {onTemplateChange && (
              <button
                onClick={() => onTemplateChange(templateId)}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Change Template
              </button>
            )}
          </div>
        </div>
      )}
      
      <div className="p-6">
        {renderTemplate()}
      </div>
    </div>
  )
}

// Modern Template
function ModernTemplate({ data, style }: { data: ResumeData; style: TemplateStyle }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b-2 border-blue-200 pb-6">
        <h1 className={cn("text-3xl font-bold mb-2", style.fonts.heading)}>
          {data.personal.name}
        </h1>
        <p className={cn("text-xl", style.fonts.accent)}>
          {data.personal.title}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-gray-600">
          <span className="flex items-center">
            <span className="mr-1">📧</span>
            {data.personal.email}
          </span>
          <span className="flex items-center">
            <span className="mr-1">📱</span>
            {data.personal.phone}
          </span>
          <span className="flex items-center">
            <span className="mr-1">📍</span>
            {data.personal.location}
          </span>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className={style.spacing.section}>
          <h2 className={cn("text-lg font-semibold mb-3", style.fonts.heading)}>
            Professional Summary
          </h2>
          <p className={cn("text-gray-700 leading-relaxed", style.fonts.body)}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      <div className={style.spacing.section}>
        <h2 className={cn("text-lg font-semibold mb-4", style.fonts.heading)}>
          Professional Experience
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className={cn("font-semibold", style.fonts.heading)}>
                  {exp.title}
                </h3>
                <span className={cn("text-sm", style.fonts.muted)}>
                  {exp.period}
                </span>
              </div>
              <p className={cn("font-medium mb-2", style.fonts.accent)}>
                {exp.company} • {exp.location}
              </p>
              <ul className="space-y-1">
                {exp.achievements?.map((achievement, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-700">
                    <span className="text-blue-500 mr-2">•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className={style.spacing.section}>
          <h2 className={cn("text-lg font-semibold mb-4", style.fonts.heading)}>
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className={cn("font-semibold", style.fonts.heading)}>
                    {edu.degree}
                  </h3>
                  <p className={cn("text-gray-600", style.fonts.body)}>
                    {edu.school}
                  </p>
                </div>
                <span className={cn("text-sm", style.fonts.muted)}>
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className={style.spacing.section}>
          <h2 className={cn("text-lg font-semibold mb-4", style.fonts.heading)}>
            Skills & Competencies
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Classic Template
function ClassicTemplate({ data, style }: { data: ResumeData; style: TemplateStyle }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-4">
        <h1 className={cn("text-2xl font-bold mb-2", style.fonts.heading)}>
          {data.personal.name}
        </h1>
        <p className={cn("text-lg", style.fonts.accent)}>
          {data.personal.title}
        </p>
        <div className="mt-3 text-sm text-gray-600 space-y-1">
          <p>{data.personal.email}</p>
          <p>{data.personal.phone}</p>
          <p>{data.personal.location}</p>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className={style.spacing.section}>
          <h2 className={cn("text-lg font-semibold mb-3 border-b border-gray-300 pb-1", style.fonts.heading)}>
            Professional Summary
          </h2>
          <p className={cn("text-gray-700", style.fonts.body)}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      <div className={style.spacing.section}>
        <h2 className={cn("text-lg font-semibold mb-4 border-b border-gray-300 pb-1", style.fonts.heading)}>
          Work Experience
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <h3 className={cn("font-semibold", style.fonts.heading)}>
                  {exp.title}
                </h3>
                <span className={cn("text-sm", style.fonts.muted)}>
                  {exp.period}
                </span>
              </div>
              <p className={cn("font-medium mb-2", style.fonts.accent)}>
                {exp.company} | {exp.location}
              </p>
              <ul className="space-y-1">
                {exp.achievements?.map((achievement, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-700">
                    <span className="text-gray-500 mr-2">•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className={style.spacing.section}>
          <h2 className={cn("text-lg font-semibold mb-4 border-b border-gray-300 pb-1", style.fonts.heading)}>
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className={cn("font-semibold", style.fonts.heading)}>
                    {edu.degree}
                  </h3>
                  <p className={cn("text-gray-600", style.fonts.body)}>
                    {edu.school}
                  </p>
                </div>
                <span className={cn("text-sm", style.fonts.muted)}>
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className={style.spacing.section}>
          <h2 className={cn("text-lg font-semibold mb-4 border-b border-gray-300 pb-1", style.fonts.heading)}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Creative Template
function CreativeTemplate({ data, style }: { data: ResumeData; style: TemplateStyle }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg text-center">
        <h1 className={cn("text-3xl font-bold mb-3", style.fonts.heading)}>
          {data.personal.name}
        </h1>
        <p className={cn("text-xl opacity-90", style.fonts.accent)}>
          {data.personal.title}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm opacity-80">
          <span className="flex items-center">
            <span className="mr-2">📧</span>
            {data.personal.email}
          </span>
          <span className="flex items-center">
            <span className="mr-2">📱</span>
            {data.personal.phone}
          </span>
          <span className="flex items-center">
            <span className="mr-2">📍</span>
            {data.personal.location}
          </span>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className={style.spacing.section}>
          <h2 className={cn("text-xl font-bold mb-4 text-purple-700", style.fonts.heading)}>
            ✨ Professional Summary
          </h2>
          <p className={cn("text-gray-700 leading-relaxed text-lg", style.fonts.body)}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      <div className={style.spacing.section}>
        <h2 className={cn("text-xl font-bold mb-6 text-purple-700", style.fonts.heading)}>
          🚀 Professional Experience
        </h2>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-lg border-l-4 border-purple-500">
              <div className="flex justify-between items-start mb-3">
                <h3 className={cn("text-lg font-bold text-purple-800", style.fonts.heading)}>
                  {exp.title}
                </h3>
                <span className={cn("text-sm bg-purple-200 text-purple-800 px-3 py-1 rounded-full", style.fonts.muted)}>
                  {exp.period}
                </span>
              </div>
              <p className={cn("font-semibold mb-3 text-purple-700", style.fonts.accent)}>
                🏢 {exp.company} • 📍 {exp.location}
              </p>
              <ul className="space-y-2">
                {exp.achievements?.map((achievement, idx) => (
                  <li key={idx} className="flex items-start text-gray-700">
                    <span className="text-pink-500 mr-3 text-lg">✦</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className={style.spacing.section}>
          <h2 className={cn("text-xl font-bold mb-6 text-purple-700", style.fonts.heading)}>
            🎯 Skills & Competencies
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium shadow-lg"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Minimal Template
function MinimalTemplate({ data, style }: { data: ResumeData; style: TemplateStyle }) {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className={cn("text-4xl font-light mb-4", style.fonts.heading)}>
          {data.personal.name}
        </h1>
        <p className={cn("text-xl text-gray-600 mb-6", style.fonts.accent)}>
          {data.personal.title}
        </p>
        <div className="text-gray-500 space-y-1">
          <p>{data.personal.email}</p>
          <p>{data.personal.phone}</p>
          <p>{data.personal.location}</p>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className={style.spacing.section}>
          <p className={cn("text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto", style.fonts.body)}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      <div className={style.spacing.section}>
        <h2 className={cn("text-2xl font-light mb-8 text-center", style.fonts.heading)}>
          Experience
        </h2>
        <div className="space-y-8">
          {data.experience.map((exp, index) => (
            <div key={index} className="text-center">
              <h3 className={cn("text-xl font-light mb-2", style.fonts.heading)}>
                {exp.title}
              </h3>
              <p className={cn("text-lg text-gray-600 mb-3", style.fonts.accent)}>
                {exp.company}
              </p>
              <p className={cn("text-sm text-gray-500 mb-4", style.fonts.muted)}>
                {exp.period} • {exp.location}
              </p>
              <div className="max-w-2xl mx-auto">
                {exp.achievements?.map((achievement, idx) => (
                  <p key={idx} className={cn("text-gray-700 mb-2", style.fonts.body)}>
                    {achievement}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className={style.spacing.section}>
          <h2 className={cn("text-2xl font-light mb-8 text-center", style.fonts.heading)}>
            Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="text-gray-700 text-lg"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Executive Template
function ExecutiveTemplate({ data, style }: { data: ResumeData; style: TemplateStyle }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Personal Info & Skills */}
      <div className="lg:col-span-1 space-y-6">
        {/* Personal Info */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h1 className={cn("text-2xl font-bold mb-3", style.fonts.heading)}>
            {data.personal.name}
          </h1>
          <p className={cn("text-lg text-gray-600 mb-4", style.fonts.accent)}>
            {data.personal.title}
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>{data.personal.email}</p>
            <p>{data.personal.phone}</p>
            <p>{data.personal.location}</p>
          </div>
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className={cn("text-lg font-semibold mb-4", style.fonts.heading)}>
              Core Competencies
            </h2>
            <div className="space-y-2">
              {data.skills.map((skill, index) => (
                <div key={index} className="text-sm text-gray-700">
                  <span className="font-medium">{skill.name}</span>
                  {skill.level && (
                    <span className="text-gray-500 ml-2">({skill.level})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Summary */}
        {data.summary && (
          <div className={style.spacing.section}>
            <h2 className={cn("text-xl font-semibold mb-4 border-b border-gray-300 pb-2", style.fonts.heading)}>
              Executive Summary
            </h2>
            <p className={cn("text-gray-700 leading-relaxed", style.fonts.body)}>
              {data.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        <div className={style.spacing.section}>
          <h2 className={cn("text-xl font-semibold mb-6 border-b border-gray-300 pb-2", style.fonts.heading)}>
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className={cn("text-lg font-semibold", style.fonts.heading)}>
                    {exp.title}
                  </h3>
                  <span className={cn("text-sm text-gray-500", style.fonts.muted)}>
                    {exp.period}
                  </span>
                </div>
                <p className={cn("font-medium mb-3 text-gray-600", style.fonts.accent)}>
                  {exp.company} • {exp.location}
                </p>
                <ul className="space-y-2">
                  {exp.achievements?.map((achievement, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <span className="text-amber-600 mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className={style.spacing.section}>
            <h2 className={cn("text-xl font-semibold mb-4 border-b border-gray-300 pb-2", style.fonts.heading)}>
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className={cn("font-semibold", style.fonts.heading)}>
                      {edu.degree}
                    </h3>
                    <p className={cn("text-gray-600", style.fonts.body)}>
                      {edu.school}
                    </p>
                  </div>
                  <span className={cn("text-sm text-gray-500", style.fonts.muted)}>
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Impact Template
function ImpactTemplate({ data, style }: { data: ResumeData; style: TemplateStyle }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center bg-green-50 p-6 rounded-lg border-2 border-green-200">
        <h1 className={cn("text-3xl font-bold mb-2 text-green-900", style.fonts.heading)}>
          {data.personal.name}
        </h1>
        <p className={cn("text-xl text-green-700", style.fonts.accent)}>
          {data.personal.title}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-green-600">
          <span>{data.personal.email}</span>
          <span>•</span>
          <span>{data.personal.phone}</span>
          <span>•</span>
          <span>{data.personal.location}</span>
        </div>
      </div>

      {/* Key Achievements */}
      <div className="bg-green-100 p-4 rounded-lg">
        <h2 className={cn("text-lg font-bold mb-3 text-green-900", style.fonts.heading)}>
          🎯 Key Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <span className="text-green-600 font-bold mr-2">↑</span>
            <span>Increased user engagement by 40%</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-600 font-bold mr-2">↓</span>
            <span>Reduced customer churn by 25%</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-600 font-bold mr-2">$</span>
            <span>Generated $2M in additional revenue</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-600 font-bold mr-2">👥</span>
            <span>Led team of 12 engineers</span>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className={style.spacing.section}>
        <h2 className={cn("text-lg font-bold mb-4 text-green-900 border-b-2 border-green-300 pb-2", style.fonts.heading)}>
          Professional Experience
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className={cn("font-bold text-green-900", style.fonts.heading)}>
                  {exp.title}
                </h3>
                <span className={cn("text-sm text-green-600", style.fonts.muted)}>
                  {exp.period}
                </span>
              </div>
              <p className={cn("font-medium mb-3 text-green-700", style.fonts.accent)}>
                {exp.company} • {exp.location}
              </p>
              <ul className="space-y-2">
                {exp.achievements?.map((achievement, idx) => (
                  <li key={idx} className="flex items-start text-sm text-green-800">
                    <span className="text-green-600 mr-2">•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className={style.spacing.section}>
          <h2 className={cn("text-lg font-bold mb-4 text-green-900", style.fonts.heading)}>
            Core Competencies
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Clean Template
function CleanTemplate({ data, style }: { data: ResumeData; style: TemplateStyle }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-4">
        <h1 className={cn("text-2xl font-semibold mb-2", style.fonts.heading)}>
          {data.personal.name}
        </h1>
        <p className={cn("text-lg text-gray-600", style.fonts.accent)}>
          {data.personal.title}
        </p>
        <div className="mt-3 text-sm text-gray-500 space-y-1">
          <p>{data.personal.email}</p>
          <p>{data.personal.phone}</p>
          <p>{data.personal.location}</p>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className={style.spacing.section}>
          <h2 className={cn("text-lg font-semibold mb-3", style.fonts.heading)}>
            Professional Summary
          </h2>
          <p className={cn("text-gray-700 leading-relaxed", style.fonts.body)}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      <div className={style.spacing.section}>
        <h2 className={cn("text-lg font-semibold mb-4", style.fonts.heading)}>
          Work Experience
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <h3 className={cn("font-semibold", style.fonts.heading)}>
                  {exp.title}
                </h3>
                <span className={cn("text-sm text-gray-500", style.fonts.muted)}>
                  {exp.period}
                </span>
              </div>
              <p className={cn("font-medium mb-2 text-blue-600", style.fonts.accent)}>
                {exp.company} • {exp.location}
              </p>
              <ul className="space-y-1">
                {exp.achievements?.map((achievement, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-700">
                    <span className="text-gray-500 mr-2">•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className={style.spacing.section}>
          <h2 className={cn("text-lg font-semibold mb-4", style.fonts.heading)}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Contemporary Template
function ContemporaryTemplate({ data, style }: { data: ResumeData; style: TemplateStyle }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-lg text-center">
        <h1 className={cn("text-3xl font-bold mb-3", style.fonts.heading)}>
          {data.personal.name}
        </h1>
        <p className={cn("text-xl opacity-90", style.fonts.accent)}>
          {data.personal.title}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm opacity-80">
          <span className="flex items-center">
            <span className="mr-2">📧</span>
            {data.personal.email}
          </span>
          <span className="flex items-center">
            <span className="mr-2">📱</span>
            {data.personal.phone}
          </span>
          <span className="flex items-center">
            <span className="mr-2">📍</span>
            {data.personal.location}
          </span>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className={style.spacing.section}>
          <h2 className={cn("text-xl font-bold mb-4 text-indigo-700", style.fonts.heading)}>
            About Me
          </h2>
          <p className={cn("text-gray-700 leading-relaxed text-lg", style.fonts.body)}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      <div className={style.spacing.section}>
        <h2 className={cn("text-xl font-bold mb-6 text-indigo-700", style.fonts.heading)}>
          Experience
        </h2>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index} className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-lg border-l-4 border-indigo-500">
              <div className="flex justify-between items-start mb-3">
                <h3 className={cn("text-lg font-bold text-indigo-800", style.fonts.heading)}>
                  {exp.title}
                </h3>
                <span className={cn("text-sm bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full", style.fonts.muted)}>
                  {exp.period}
                </span>
              </div>
              <p className={cn("font-semibold mb-3 text-indigo-700", style.fonts.accent)}>
                {exp.company} • {exp.location}
              </p>
              <ul className="space-y-2">
                {exp.achievements?.map((achievement, idx) => (
                  <li key={idx} className="flex items-start text-gray-700">
                    <span className="text-purple-500 mr-3 text-lg">✦</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className={style.spacing.section}>
          <h2 className={cn("text-xl font-bold mb-6 text-indigo-700", style.fonts.heading)}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-lg"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Elegant Template
function ElegantTemplate({ data, style }: { data: ResumeData; style: TemplateStyle }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Personal Info & Skills */}
      <div className="lg:col-span-1 space-y-6">
        {/* Personal Info */}
        <div className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-lg border border-gray-200">
          <h1 className={cn("text-2xl font-light mb-3", style.fonts.heading)}>
            {data.personal.name}
          </h1>
          <p className={cn("text-lg text-amber-600 mb-4", style.fonts.accent)}>
            {data.personal.title}
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>{data.personal.email}</p>
            <p>{data.personal.phone}</p>
            <p>{data.personal.location}</p>
          </div>
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-lg border border-gray-200">
            <h2 className={cn("text-lg font-light mb-4", style.fonts.heading)}>
              Expertise
            </h2>
            <div className="space-y-2">
              {data.skills.map((skill, index) => (
                <div key={index} className="text-sm text-gray-700">
                  <span className="font-medium">{skill.name}</span>
                  {skill.level && (
                    <span className="text-gray-500 ml-2">({skill.level})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Summary */}
        {data.summary && (
          <div className={style.spacing.section}>
            <h2 className={cn("text-xl font-light mb-4 border-b border-gray-300 pb-2", style.fonts.heading)}>
              Professional Profile
            </h2>
            <p className={cn("text-gray-700 leading-relaxed", style.fonts.body)}>
              {data.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        <div className={style.spacing.section}>
          <h2 className={cn("text-xl font-light mb-6 border-b border-gray-300 pb-2", style.fonts.heading)}>
            Career Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className={cn("text-lg font-light", style.fonts.heading)}>
                    {exp.title}
                  </h3>
                  <span className={cn("text-sm text-gray-500", style.fonts.muted)}>
                    {exp.period}
                  </span>
                </div>
                <p className={cn("font-medium mb-3 text-amber-600", style.fonts.accent)}>
                  {exp.company} • {exp.location}
                </p>
                <ul className="space-y-2">
                  {exp.achievements?.map((achievement, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <span className="text-amber-600 mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Simple Template
function SimpleTemplate({ data, style }: { data: ResumeData; style: TemplateStyle }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className={cn("text-3xl font-bold mb-3", style.fonts.heading)}>
          {data.personal.name}
        </h1>
        <p className={cn("text-xl text-gray-600 mb-4", style.fonts.accent)}>
          {data.personal.title}
        </p>
        <div className="text-gray-500 space-y-1">
          <p>{data.personal.email}</p>
          <p>{data.personal.phone}</p>
          <p>{data.personal.location}</p>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className={style.spacing.section}>
          <p className={cn("text-lg text-gray-700 leading-relaxed", style.fonts.body)}>
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      <div className={style.spacing.section}>
        <h2 className={cn("text-2xl font-bold mb-6", style.fonts.heading)}>
          Work Experience
        </h2>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <h3 className={cn("text-xl font-bold mb-2", style.fonts.heading)}>
                {exp.title}
              </h3>
              <p className={cn("text-lg text-gray-600 mb-2", style.fonts.accent)}>
                {exp.company}
              </p>
              <p className={cn("text-sm text-gray-500 mb-3", style.fonts.muted)}>
                {exp.period} • {exp.location}
              </p>
              <ul className="space-y-2">
                {exp.achievements?.map((achievement, idx) => (
                  <li key={idx} className={cn("text-gray-700", style.fonts.body)}>
                    • {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className={style.spacing.section}>
          <h2 className={cn("text-2xl font-bold mb-6", style.fonts.heading)}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-4">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="text-lg text-gray-700"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
