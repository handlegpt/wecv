'use client'

import { useTranslation } from 'react-i18next'

interface TemplatePreviewProps {
  templateId: string
  className?: string
}

// 示例简历数据
const sampleResumeData = {
  personal: {
    name: 'John Smith',
    title: 'Senior Software Engineer',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  },
  summary: 'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading development teams.',
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      period: '2021 - Present',
      description: 'Led development of microservices architecture, improved system performance by 40%, and mentored 3 junior developers.'
    },
    {
      title: 'Software Engineer',
      company: 'InnovateLab',
      period: '2019 - 2021',
      description: 'Developed React-based web applications, collaborated with cross-functional teams, and implemented CI/CD pipelines.'
    }
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      period: '2015 - 2019'
    }
  ],
  skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'MongoDB']
}

export function TemplatePreview({ templateId, className = '' }: TemplatePreviewProps) {
  const { t } = useTranslation()

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate data={sampleResumeData} />
      case 'classic':
        return <ClassicTemplate data={sampleResumeData} />
      case 'creative':
        return <CreativeTemplate data={sampleResumeData} />
      case 'minimal':
        return <MinimalTemplate data={sampleResumeData} />
      default:
        return <ModernTemplate data={sampleResumeData} />
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {renderTemplate()}
    </div>
  )
}

// 现代模板
function ModernTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-sans">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {data.personal.name}
        </h1>
        <p className="text-lg text-blue-600 font-medium mb-2">
          {data.personal.title}
        </p>
        <div className="flex justify-center space-x-4 text-sm text-gray-600">
          <span>{data.personal.email}</span>
          <span>•</span>
          <span>{data.personal.phone}</span>
          <span>•</span>
          <span>{data.personal.location}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b-2 border-blue-600 pb-1">
          Professional Summary
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
          Work Experience
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900 text-sm">{exp.title}</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {exp.period}
                </span>
              </div>
              <p className="text-blue-600 text-sm font-medium mb-1">{exp.company}</p>
              <p className="text-gray-700 text-xs leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b-2 border-blue-600 pb-1">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill: string, index: number) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// 经典模板
function ClassicTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-serif">
      {/* Header */}
      <div className="text-center mb-6 border-b-2 border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.personal.name}
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          {data.personal.title}
        </p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>{data.personal.email}</p>
          <p>{data.personal.phone}</p>
          <p>{data.personal.location}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Summary</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Work Experience</h2>
        <div className="space-y-4">
          {data.experience.map((exp: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900 text-sm">{exp.title}</h3>
                <span className="text-xs text-gray-500">{exp.period}</span>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">{exp.company}</p>
              <p className="text-gray-700 text-xs leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill: string, index: number) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// 创意模板
function CreativeTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-sans bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {data.personal.name}
        </h1>
        <p className="text-lg opacity-90 mb-2">
          {data.personal.title}
        </p>
        <div className="grid grid-cols-1 gap-1 text-sm opacity-80">
          <div className="flex items-center">
            <span className="mr-2">📧</span>
            {data.personal.email}
          </div>
          <div className="flex items-center">
            <span className="mr-2">📱</span>
            {data.personal.phone}
          </div>
          <div className="flex items-center">
            <span className="mr-2">📍</span>
            {data.personal.location}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Summary */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <span className="w-6 h-1 bg-blue-600 rounded mr-2"></span>
              Summary
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {data.summary}
            </p>
          </div>

          {/* Experience */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <span className="w-6 h-1 bg-blue-600 rounded mr-2"></span>
              Experience
            </h2>
            <div className="space-y-3">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="relative pl-4 border-l-2 border-blue-200">
                  <div className="absolute w-2 h-2 bg-blue-600 rounded-full -left-1 top-2"></div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{exp.title}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-blue-600 text-sm font-medium mb-1">{exp.company}</p>
                  <p className="text-gray-700 text-xs leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Skills */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <span className="w-6 h-1 bg-purple-600 rounded mr-2"></span>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 简约模板
function MinimalTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-sans">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-gray-900 mb-2">
          {data.personal.name}
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          {data.personal.title}
        </p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>{data.personal.email}</p>
          <p>{data.personal.phone}</p>
          <p>{data.personal.location}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-3">Summary</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Experience</h2>
        <div className="space-y-6">
          {data.experience.map((exp: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900 text-sm">{exp.title}</h3>
                <span className="text-xs text-gray-500">{exp.period}</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{exp.company}</p>
              <p className="text-gray-700 text-xs leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill: string, index: number) => (
            <span
              key={index}
              className="text-gray-700 text-xs border border-gray-300 px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
} 