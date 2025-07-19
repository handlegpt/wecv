'use client'

import { useTranslation } from 'react-i18next'

interface ResumeTemplateRendererProps {
  resumeData: any
  templateId: string
  className?: string
}

export default function ResumeTemplateRenderer({ resumeData, templateId, className = '' }: ResumeTemplateRendererProps) {
  const { t } = useTranslation()

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate data={resumeData} />
      case 'classic':
        return <ClassicTemplate data={resumeData} />
      case 'creative':
        return <CreativeTemplate data={resumeData} />
      case 'minimal':
        return <MinimalTemplate data={resumeData} />
      case 'impact':
        return <ImpactTemplate data={resumeData} />
      case 'clean':
        return <CleanTemplate data={resumeData} />
      case 'contemporary':
        return <ContemporaryTemplate data={resumeData} />
      case 'executive':
        return <ExecutiveTemplate data={resumeData} />
      case 'elegant':
        return <ElegantTemplate data={resumeData} />
      case 'simple':
        return <SimpleTemplate data={resumeData} />
      default:
        return <ModernTemplate data={resumeData} />
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {renderTemplate()}
    </div>
  )
}

// Modern Template
function ModernTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-sans">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {data.content?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          {data.content?.personal?.title || 'Professional Title'}
        </p>
        <div className="flex justify-center space-x-4 text-sm text-gray-500">
          <span>{data.content?.personal?.email || 'email@example.com'}</span>
          <span>{data.content?.personal?.phone || '+1 (555) 123-4567'}</span>
          <span>{data.content?.personal?.location || 'City, State'}</span>
        </div>
      </div>

      {/* Summary */}
      {data.content?.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            {data.content.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.content?.experience && data.content.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.content.experience.map((exp: any, index: number) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                </div>
                <p className="text-gray-600 mb-2">{exp.company} | {exp.location}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.content?.education && data.content.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {data.content.education.map((edu: any, index: number) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4">
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
      {data.content?.skills && data.content.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.content.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
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

// Classic Template
function ClassicTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-serif">
      {/* Header */}
      <div className="text-center mb-6 border-b-2 border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.content?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          {data.content?.personal?.title || 'Professional Title'}
        </p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>{data.content?.personal?.email || 'email@example.com'}</p>
          <p>{data.content?.personal?.phone || '+1 (555) 123-4567'}</p>
          <p>{data.content?.personal?.location || 'City, State'}</p>
        </div>
      </div>

      {/* Summary */}
      {data.content?.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            {data.content.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.content?.experience && data.content.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Work Experience</h2>
          <div className="space-y-4">
            {data.content.experience.map((exp: any, index: number) => (
              <div key={index} className="border-l-4 border-gray-300 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                </div>
                <p className="text-gray-600 mb-2">{exp.company} | {exp.location}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.content?.education && data.content.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Education</h2>
          <div className="space-y-4">
            {data.content.education.map((edu: any, index: number) => (
              <div key={index} className="border-l-4 border-gray-300 pl-4">
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
      {data.content?.skills && data.content.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.content.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-xs"
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

// Creative Template
function CreativeTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-sans bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {data.content?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-lg mb-3 opacity-90">
          {data.content?.personal?.title || 'Professional Title'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center min-w-0">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="truncate">{data.content?.personal?.email || 'email@example.com'}</span>
          </div>
          <div className="flex items-center min-w-0">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="truncate">{data.content?.personal?.phone || '+1 (555) 123-4567'}</span>
          </div>
          <div className="flex items-center min-w-0 sm:col-span-2 lg:col-span-1">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="truncate">{data.content?.personal?.location || 'City, State'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary */}
          {data.content?.summary && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <span className="w-6 h-1 bg-blue-600 rounded mr-3"></span>
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm">
                {data.content.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.content?.experience && data.content.experience.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-1 bg-blue-600 rounded mr-3"></span>
                Work Experience
              </h2>
              <div className="space-y-4">
                {data.content.experience.map((exp: any, index: number) => (
                  <div key={index} className="relative pl-6 border-l-2 border-blue-200">
                    <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5 top-2"></div>
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
          {data.content?.education && data.content.education.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-1 bg-blue-600 rounded mr-3"></span>
                Education
              </h2>
              <div className="space-y-4">
                {data.content.education.map((edu: any, index: number) => (
                  <div key={index} className="relative pl-6 border-l-2 border-blue-200">
                    <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5 top-2"></div>
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
        <div className="lg:col-span-1">
          {/* Skills */}
          {data.content?.skills && data.content.skills.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                <span className="w-6 h-1 bg-blue-600 rounded mr-3"></span>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.content.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Minimal Template
function MinimalTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-sans">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {data.content?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-gray-600 mb-2">
          {data.content?.personal?.title || 'Professional Title'}
        </p>
        <div className="text-xs text-gray-500 space-y-1">
          <p>{data.content?.personal?.email || 'email@example.com'}</p>
          <p>{data.content?.personal?.phone || '+1 (555) 123-4567'}</p>
          <p>{data.content?.personal?.location || 'City, State'}</p>
        </div>
      </div>

      {/* Summary */}
      {data.content?.summary && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
            Summary
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            {data.content.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.content?.experience && data.content.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
            Experience
          </h2>
          <div className="space-y-3">
            {data.content.experience.map((exp: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{exp.title}</h3>
                  <span className="text-xs text-gray-500">{exp.period}</span>
                </div>
                <p className="text-gray-600 text-xs mb-1">{exp.company} | {exp.location}</p>
                <p className="text-gray-700 text-xs leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.content?.education && data.content.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-3">
            {data.content.education.map((edu: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
                  <span className="text-xs text-gray-500">{edu.period}</span>
                </div>
                <p className="text-gray-600 text-xs mb-1">{edu.school}</p>
                <p className="text-gray-700 text-xs leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.content?.skills && data.content.skills.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1">
            {data.content.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
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

// Impact Template
function ImpactTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-sans bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2 text-yellow-400">
          {data.content?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-lg font-medium mb-3 text-blue-200">
          {data.content?.personal?.title || 'Professional Title'}
        </p>
        <div className="flex justify-center space-x-4 text-sm text-gray-300">
          <span>{data.content?.personal?.email || 'email@example.com'}</span>
          <span>•</span>
          <span>{data.content?.personal?.phone || '+1 (555) 123-4567'}</span>
          <span>•</span>
          <span>{data.content?.personal?.location || 'City, State'}</span>
        </div>
      </div>

      {/* Summary */}
      {data.content?.summary && (
        <div className="mb-6 bg-white/10 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-3 text-yellow-400">PROFESSIONAL SUMMARY</h2>
          <p className="text-sm text-gray-200">
            {data.content.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.content?.experience && data.content.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-yellow-400 border-b border-yellow-400 pb-1">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-4">
            {data.content.experience.map((exp: any, index: number) => (
              <div key={index} className="bg-white/5 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{exp.title}</h3>
                  <span className="text-sm text-gray-300">{exp.period}</span>
                </div>
                <p className="text-blue-200 font-medium mb-3">{exp.company} | {exp.location}</p>
                <p className="text-gray-200 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.content?.education && data.content.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-yellow-400 border-b border-yellow-400 pb-1">
            EDUCATION
          </h2>
          <div className="space-y-4">
            {data.content.education.map((edu: any, index: number) => (
              <div key={index} className="bg-white/5 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{edu.degree}</h3>
                  <span className="text-sm text-gray-300">{edu.period}</span>
                </div>
                <p className="text-blue-200 font-medium mb-3">{edu.school}</p>
                <p className="text-gray-200 text-sm leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.content?.skills && data.content.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3 text-yellow-400">CORE COMPETENCIES</h2>
          <div className="flex flex-wrap gap-2">
            {data.content.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="bg-yellow-400 text-blue-900 text-xs px-3 py-1 rounded-full font-medium"
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

// Clean Template
function CleanTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-sans">
      {/* Header */}
      <div className="text-center mb-6 border-b-2 border-gray-300 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {data.content?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-lg text-gray-600 mb-3">
          {data.content?.personal?.title || 'Professional Title'}
        </p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>{data.content?.personal?.email || 'email@example.com'}</p>
          <p>{data.content?.personal?.phone || '+1 (555) 123-4567'}</p>
          <p>{data.content?.personal?.location || 'City, State'}</p>
        </div>
      </div>

      {/* Summary */}
      {data.content?.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">PROFESSIONAL SUMMARY</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            {data.content.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.content?.experience && data.content.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">WORK EXPERIENCE</h2>
          <div className="space-y-4">
            {data.content.experience.map((exp: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                </div>
                <p className="text-gray-600 font-medium mb-2">{exp.company} | {exp.location}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.content?.education && data.content.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">EDUCATION</h2>
          <div className="space-y-2">
            {data.content.education.map((edu: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.school}</p>
                  </div>
                  <span className="text-sm text-gray-500">{edu.period}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mt-1">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.content?.skills && data.content.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {data.content.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-xs"
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

// Contemporary Template
function ContemporaryTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {data.content?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-lg text-gray-600 mb-3">
          {data.content?.personal?.title || 'Professional Title'}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            </svg>
            {data.content?.personal?.email || 'email@example.com'}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {data.content?.personal?.phone || '+1 (555) 123-4567'}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {data.content?.personal?.location || 'City, State'}
          </span>
        </div>
      </div>

      {/* Summary */}
      {data.content?.summary && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Summary</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            {data.content.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.content?.experience && data.content.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Experience</h2>
          <div className="space-y-4">
            {data.content.experience.map((exp: any, index: number) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                </div>
                <p className="text-gray-600 mb-2">{exp.company} | {exp.location}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.content?.education && data.content.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>
          <div className="space-y-4">
            {data.content.education.map((edu: any, index: number) => (
              <div key={index} className="border-l-4 border-green-500 pl-4">
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
      {data.content?.skills && data.content.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.content.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
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

// Executive Template
function ExecutiveTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-serif">
      {/* Header */}
      <div className="text-center mb-6 border-b-4 border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.content?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-xl text-gray-600 mb-3">
          {data.content?.personal?.title || 'Executive Title'}
        </p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>{data.content?.personal?.email || 'email@example.com'}</p>
          <p>{data.content?.personal?.phone || '+1 (555) 123-4567'}</p>
          <p>{data.content?.personal?.location || 'City, State'}</p>
        </div>
      </div>

      {/* Summary */}
      {data.content?.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">EXECUTIVE SUMMARY</h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            {data.content.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.content?.experience && data.content.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">PROFESSIONAL EXPERIENCE</h2>
          <div className="space-y-4">
            {data.content.experience.map((exp: any, index: number) => (
              <div key={index} className="border-l-4 border-gray-800 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                </div>
                <p className="text-gray-600 mb-2">{exp.company} | {exp.location}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.content?.education && data.content.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">EDUCATION</h2>
          <div className="space-y-4">
            {data.content.education.map((edu: any, index: number) => (
              <div key={index} className="border-l-4 border-gray-800 pl-4">
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
      {data.content?.skills && data.content.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">CORE COMPETENCIES</h2>
          <div className="flex flex-wrap gap-2">
            {data.content.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-800 text-white rounded text-xs"
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

// Elegant Template
function ElegantTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-serif">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.content?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-xl text-gray-600 mb-3 italic">
          {data.content?.personal?.title || 'Professional Title'}
        </p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>{data.content?.personal?.email || 'email@example.com'}</p>
          <p>{data.content?.personal?.phone || '+1 (555) 123-4567'}</p>
          <p>{data.content?.personal?.location || 'City, State'}</p>
        </div>
      </div>

      {/* Summary */}
      {data.content?.summary && (
        <div className="mb-6 border-l-4 border-gray-300 pl-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            {data.content.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.content?.experience && data.content.experience.length > 0 && (
        <div className="mb-6 border-l-4 border-gray-300 pl-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h2>
          <div className="space-y-4">
            {data.content.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                </div>
                <p className="text-gray-600 mb-2 italic">{exp.company} | {exp.location}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.content?.education && data.content.education.length > 0 && (
        <div className="mb-6 border-l-4 border-gray-300 pl-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>
          <div className="space-y-4">
            {data.content.education.map((edu: any, index: number) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">{edu.period}</span>
                </div>
                <p className="text-gray-600 mb-2 italic">{edu.school}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.content?.skills && data.content.skills.length > 0 && (
        <div className="border-l-4 border-gray-300 pl-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.content.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-xs"
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

// Simple Template
function SimpleTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          {data.content?.personal?.name || 'Your Name'}
        </h1>
        <p className="text-gray-600 mb-2">
          {data.content?.personal?.title || 'Professional Title'}
        </p>
        <div className="text-xs text-gray-500 space-y-1">
          <p>{data.content?.personal?.email || 'email@example.com'}</p>
          <p>{data.content?.personal?.phone || '+1 (555) 123-4567'}</p>
          <p>{data.content?.personal?.location || 'City, State'}</p>
        </div>
      </div>

      {/* Summary */}
      {data.content?.summary && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
            Summary
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            {data.content.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.content?.experience && data.content.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
            Experience
          </h2>
          <div className="space-y-3">
            {data.content.experience.map((exp: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{exp.title}</h3>
                  <span className="text-xs text-gray-500">{exp.period}</span>
                </div>
                <p className="text-gray-600 text-xs mb-1">{exp.company} | {exp.location}</p>
                <p className="text-gray-700 text-xs leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.content?.education && data.content.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-3">
            {data.content.education.map((edu: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
                  <span className="text-xs text-gray-500">{edu.period}</span>
                </div>
                <p className="text-gray-600 text-xs mb-1">{edu.school}</p>
                <p className="text-gray-700 text-xs leading-relaxed">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.content?.skills && data.content.skills.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1">
            {data.content.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
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