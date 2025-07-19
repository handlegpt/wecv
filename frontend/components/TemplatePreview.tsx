'use client'

import { useTranslation } from 'react-i18next'

interface TemplatePreviewProps {
  templateId: string
  className?: string
}

// 改进的示例简历数据
const sampleResumeData = {
  personal: {
    name: 'Sarah Johnson',
    title: 'Senior Product Manager',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sarahjohnson',
    website: 'sarahjohnson.dev'
  },
  summary: 'Results-driven Product Manager with 8+ years of experience leading cross-functional teams and delivering innovative products that drive business growth. Proven track record of increasing user engagement by 40% and reducing churn by 25%.',
  experience: [
    {
      title: 'Senior Product Manager',
      company: 'TechCorp Inc.',
      period: '2021 - Present',
      location: 'San Francisco, CA',
      achievements: [
        'Led development of flagship product, resulting in 40% increase in user engagement',
        'Managed team of 12 engineers and designers across 3 time zones',
        'Reduced customer churn by 25% through data-driven product improvements',
        'Increased revenue by $2M through strategic feature launches'
      ]
    },
    {
      title: 'Product Manager',
      company: 'InnovateLab',
      period: '2019 - 2021',
      location: 'New York, NY',
      achievements: [
        'Launched 3 successful products with 100K+ active users',
        'Collaborated with engineering teams to deliver features on time',
        'Conducted user research and A/B testing to optimize conversion rates'
      ]
    }
  ],
  education: [
    {
      degree: 'Master of Business Administration',
      school: 'Stanford Graduate School of Business',
      period: '2017 - 2019',
      gpa: '3.8/4.0'
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of California, Berkeley',
      period: '2013 - 2017',
      gpa: '3.9/4.0'
    }
  ],
  skills: {
    technical: ['Product Strategy', 'Data Analysis', 'User Research', 'A/B Testing', 'SQL', 'Python'],
    soft: ['Leadership', 'Cross-functional Collaboration', 'Stakeholder Management', 'Agile/Scrum']
  },
  certifications: [
    'Certified Scrum Product Owner (CSPO)',
    'Google Analytics Individual Qualification',
    'AWS Certified Solutions Architect'
  ],
  languages: ['English (Native)', 'Spanish (Fluent)', 'Mandarin (Conversational)']
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
      case 'impact':
        return <ImpactTemplate data={sampleResumeData} />
      case 'clean':
        return <CleanTemplate data={sampleResumeData} />
      case 'contemporary':
        return <ContemporaryTemplate data={sampleResumeData} />
      case 'executive':
        return <ExecutiveTemplate data={sampleResumeData} />
      case 'elegant':
        return <ElegantTemplate data={sampleResumeData} />
      case 'simple':
        return <SimpleTemplate data={sampleResumeData} />
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

// Impact Template - 强调成就和影响力
function ImpactTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-sans bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-yellow-400">
          {data.personal.name}
        </h1>
        <p className="text-xl font-medium mb-4 text-blue-200">
          {data.personal.title}
        </p>
        <div className="flex justify-center space-x-4 text-sm text-gray-300">
          <span>{data.personal.email}</span>
          <span>•</span>
          <span>{data.personal.phone}</span>
          <span>•</span>
          <span>{data.personal.location}</span>
        </div>
      </div>

      {/* Key Achievements */}
      <div className="mb-6 bg-white/10 p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-3 text-yellow-400">KEY ACHIEVEMENTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center">
            <span className="text-yellow-400 font-bold mr-2">↑</span>
            <span>Increased user engagement by 40%</span>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400 font-bold mr-2">↓</span>
            <span>Reduced customer churn by 25%</span>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400 font-bold mr-2">$</span>
            <span>Generated $2M in additional revenue</span>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400 font-bold mr-2">👥</span>
            <span>Led team of 12 engineers</span>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4 text-yellow-400 border-b border-yellow-400 pb-1">
          PROFESSIONAL EXPERIENCE
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="bg-white/5 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{exp.title}</h3>
                <span className="text-sm text-gray-300">{exp.period}</span>
              </div>
              <p className="text-blue-200 font-medium mb-3">{exp.company} | {exp.location}</p>
              <ul className="space-y-1 text-sm">
                {exp.achievements.map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-bold mb-3 text-yellow-400">CORE COMPETENCIES</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.technical.map((skill: string, index: number) => (
            <span
              key={index}
              className="bg-yellow-400 text-blue-900 text-xs px-3 py-1 rounded-full font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Clean Template - 简洁清晰
function CleanTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-sans">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.personal.name}
        </h1>
        <p className="text-xl text-gray-600 mb-4">
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
        <h2 className="text-lg font-semibold text-gray-900 mb-3">PROFESSIONAL SUMMARY</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">WORK EXPERIENCE</h2>
        <div className="space-y-4">
          {data.experience.map((exp: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                <span className="text-sm text-gray-500">{exp.period}</span>
              </div>
              <p className="text-gray-600 font-medium mb-2">{exp.company} | {exp.location}</p>
              <ul className="space-y-1 text-sm text-gray-700">
                {exp.achievements.map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">EDUCATION</h2>
        <div className="space-y-2">
          {data.education.map((edu: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.school}</p>
                </div>
                <span className="text-sm text-gray-500">{edu.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">SKILLS</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.technical.map((skill: string, index: number) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Contemporary Template - 现代风格
function ContemporaryTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {data.personal.name}
        </h1>
        <p className="text-lg opacity-90 mb-3">
          {data.personal.title}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm opacity-80">
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
          <div className="flex items-center">
            <span className="mr-2">🔗</span>
            {data.personal.linkedin}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <span className="w-8 h-1 bg-blue-600 rounded mr-3"></span>
              Professional Summary
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {data.summary}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-8 h-1 bg-blue-600 rounded mr-3"></span>
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="relative pl-6 border-l-2 border-blue-200">
                  <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5 top-2"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">{exp.company} | {exp.location}</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {exp.achievements.map((achievement: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skills */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <span className="w-8 h-1 bg-purple-600 rounded mr-3"></span>
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.technical.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <span className="w-8 h-1 bg-green-600 rounded mr-3"></span>
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu: any, index: number) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm">{edu.school}</p>
                  <p className="text-gray-500 text-xs">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              <span className="w-8 h-1 bg-orange-600 rounded mr-3"></span>
              Certifications
            </h2>
            <div className="space-y-2">
              {data.certifications.map((cert: string, index: number) => (
                <p key={index} className="text-sm text-gray-700">• {cert}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Executive Template - 高管风格
function ExecutiveTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-serif bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          {data.personal.name}
        </h1>
        <p className="text-2xl text-gray-700 mb-4 font-medium">
          {data.personal.title}
        </p>
        <div className="text-sm text-gray-600 space-y-1">
          <p>{data.personal.email} | {data.personal.phone}</p>
          <p>{data.personal.location} | {data.personal.linkedin}</p>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-800 pb-2">
          EXECUTIVE SUMMARY
        </h2>
        <p className="text-gray-700 text-base leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Core Competencies */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-800 pb-2">
          CORE COMPETENCIES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Strategic Leadership</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Cross-functional team management</li>
              <li>• Strategic planning and execution</li>
              <li>• Stakeholder relationship building</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Business Acumen</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Revenue growth and optimization</li>
              <li>• Market analysis and strategy</li>
              <li>• Performance metrics and KPIs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Professional Experience */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-800 pb-2">
          PROFESSIONAL EXPERIENCE
        </h2>
        <div className="space-y-6">
          {data.experience.map((exp: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                  <p className="text-lg font-semibold text-gray-700">{exp.company}</p>
                  <p className="text-gray-600">{exp.location}</p>
                </div>
                <span className="text-sm text-gray-500 font-medium">{exp.period}</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {exp.achievements.map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gray-800 mr-2 font-bold">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Credentials */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-800 pb-2">
          EDUCATION & CREDENTIALS
        </h2>
        <div className="space-y-3">
          {data.education.map((edu: any, index: number) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
              <p className="text-gray-700">{edu.school}</p>
              <p className="text-gray-600 text-sm">{edu.period} | GPA: {edu.gpa}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Elegant Template - 优雅精致
function ElegantTemplate({ data }: { data: any }) {
  return (
    <div className="p-8 font-serif bg-white">
      {/* Header */}
      <div className="text-center mb-10 border-b-2 border-gray-300 pb-8">
        <h1 className="text-4xl font-light text-gray-900 mb-3 tracking-wide">
          {data.personal.name}
        </h1>
        <p className="text-xl text-gray-600 mb-6 font-medium">
          {data.personal.title}
        </p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>{data.personal.email}</p>
          <p>{data.personal.phone} | {data.personal.location}</p>
          <p>{data.personal.linkedin}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
          Professional Summary
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed italic">
          {data.summary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 uppercase tracking-wide">
          Professional Experience
        </h2>
        <div className="space-y-6">
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="border-l-4 border-gray-300 pl-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                  <p className="text-gray-600 font-medium">{exp.company}</p>
                  <p className="text-gray-500 text-sm">{exp.location}</p>
                </div>
                <span className="text-sm text-gray-500 italic">{exp.period}</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {exp.achievements.map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gray-400 mr-3">◦</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Core Competencies
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.technical.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="text-gray-700 text-xs border border-gray-300 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Leadership Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.soft.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="text-gray-700 text-xs border border-gray-300 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu: any, index: number) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-600">{edu.school}</p>
                <p className="text-gray-500 text-sm">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Simple Template - 极简设计
function SimpleTemplate({ data }: { data: any }) {
  return (
    <div className="p-6 font-sans">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
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
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-3">Summary</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Experience</h2>
        <div className="space-y-4">
          {data.experience.map((exp: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{exp.title}</h3>
                <span className="text-xs text-gray-500">{exp.period}</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{exp.company}</p>
              <ul className="space-y-1 text-sm text-gray-700">
                {exp.achievements.map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.technical.map((skill: string, index: number) => (
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

// 现代模板 - 改进版
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
              <ul className="space-y-1 text-xs text-gray-700">
                {exp.achievements.map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
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
          {data.skills.technical.map((skill: string, index: number) => (
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

// 经典模板 - 改进版
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
              <ul className="space-y-1 text-xs text-gray-700">
                {exp.achievements.map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.technical.map((skill: string, index: number) => (
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

// 创意模板 - 改进版
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
                  <ul className="space-y-1 text-xs text-gray-700">
                    {exp.achievements.map((achievement: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
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
              {data.skills.technical.map((skill: string, index: number) => (
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

// 简约模板 - 改进版
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
              <ul className="space-y-1 text-xs text-gray-700">
                {exp.achievements.map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.technical.map((skill: string, index: number) => (
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