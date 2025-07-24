'use client'

import { useTranslation } from 'react-i18next'

interface TemplatePreviewProps {
  templateId: string
  className?: string
}

// Enhanced sample resume data
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

// Impact Template - Emphasizes achievements and impact
function ImpactTemplate({ data }: { data: any }) {
  return (
    <div className="p-4 font-sans bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold mb-1 text-yellow-400">
          {data.personal.name}
        </h1>
        <p className="text-base font-medium mb-2 text-blue-200">
          {data.personal.title}
        </p>
        <div className="flex justify-center space-x-2 text-xs text-gray-300">
          <span className="truncate">{data.personal.email}</span>
          <span>•</span>
          <span className="truncate">{data.personal.phone}</span>
          <span>•</span>
          <span className="truncate">{data.personal.location}</span>
        </div>
      </div>

      {/* Key Achievements */}
      <div className="mb-4 bg-white/10 p-3 rounded-lg">
        <h2 className="text-base font-bold mb-2 text-yellow-400">KEY ACHIEVEMENTS</h2>
        <div className="grid grid-cols-1 gap-2 text-xs">
          <div className="flex items-center">
            <span className="text-yellow-400 font-bold mr-1">↑</span>
            <span>Increased user engagement by 40%</span>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400 font-bold mr-1">↓</span>
            <span>Reduced customer churn by 25%</span>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400 font-bold mr-1">$</span>
            <span>Generated $2M in additional revenue</span>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400 font-bold mr-1">👥</span>
            <span>Led team of 12 engineers</span>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h2 className="text-base font-bold mb-3 text-yellow-400 border-b border-yellow-400 pb-1">
          PROFESSIONAL EXPERIENCE
        </h2>
        <div className="space-y-3">
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="bg-white/5 p-3 rounded-lg">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm">{exp.title}</h3>
                <span className="text-xs text-gray-300">{exp.period}</span>
              </div>
              <p className="text-blue-200 font-medium mb-2 text-xs">{exp.company} | {exp.location}</p>
              <ul className="space-y-1 text-xs">
                {exp.achievements.slice(0, 2).map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-yellow-400 mr-1">•</span>
                    <span className="text-xs">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-base font-bold mb-2 text-yellow-400">CORE COMPETENCIES</h2>
        <div className="flex flex-wrap gap-1">
          {data.skills.technical.slice(0, 4).map((skill: string, index: number) => (
            <span
              key={index}
              className="bg-yellow-400 text-blue-900 text-xs px-2 py-1 rounded-full font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Clean Template - Clean and clear design
function CleanTemplate({ data }: { data: any }) {
  return (
    <div className="p-4 font-sans">
      {/* Header */}
      <div className="text-center mb-4 border-b-2 border-gray-300 pb-3">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          {data.personal.name}
        </h1>
        <p className="text-base text-gray-600 mb-2">
          {data.personal.title}
        </p>
        <div className="text-xs text-gray-500 space-y-1">
          <p className="truncate">{data.personal.email}</p>
          <p className="truncate">{data.personal.phone}</p>
          <p className="truncate">{data.personal.location}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-2">PROFESSIONAL SUMMARY</h2>
        <p className="text-gray-700 text-xs leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-3">WORK EXPERIENCE</h2>
        <div className="space-y-3">
          {data.experience.map((exp: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900 text-xs">{exp.title}</h3>
                <span className="text-xs text-gray-500">{exp.period}</span>
              </div>
              <p className="text-gray-600 font-medium mb-1 text-xs">{exp.company} | {exp.location}</p>
              <ul className="space-y-1 text-xs text-gray-700">
                {exp.achievements.slice(0, 2).map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gray-500 mr-1">•</span>
                    <span className="text-xs">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-2">EDUCATION</h2>
        <div className="space-y-2">
          {data.education.map((edu: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900 text-xs">{edu.degree}</h3>
                  <p className="text-gray-600 text-xs">{edu.school}</p>
                </div>
                <span className="text-xs text-gray-500">{edu.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">SKILLS</h2>
        <div className="flex flex-wrap gap-1">
          {data.skills.technical.slice(0, 4).map((skill: string, index: number) => (
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

// Contemporary Template - Modern style
function ContemporaryTemplate({ data }: { data: any }) {
  return (
    <div className="p-4 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg mb-4">
        <h1 className="text-xl font-bold mb-1">
          {data.personal.name}
        </h1>
        <p className="text-base opacity-90 mb-2">
          {data.personal.title}
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs opacity-80">
          <div className="flex items-center">
            <span className="mr-1">📧</span>
            <span className="truncate">{data.personal.email}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">📱</span>
            <span className="truncate">{data.personal.phone}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">📍</span>
            <span className="truncate">{data.personal.location}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">🔗</span>
            <span className="truncate">{data.personal.linkedin}</span>
          </div>
        </div>
      </div>

      {/* Use vertical layout instead of multi-column grid */}
      <div className="space-y-4">
        {/* Professional Summary - Full width */}
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center">
            <span className="w-6 h-1 bg-blue-600 rounded mr-2"></span>
            Professional Summary
          </h2>
          <p className="text-gray-700 text-xs leading-relaxed">
            {data.summary}
          </p>
        </div>

        {/* Work Experience - Full width */}
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center">
            <span className="w-6 h-1 bg-blue-600 rounded mr-2"></span>
            Work Experience
          </h2>
          <div className="space-y-3">
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="relative pl-4 border-l-2 border-blue-200">
                <div className="absolute w-2 h-2 bg-blue-600 rounded-full -left-1 top-1"></div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900 text-xs">{exp.title}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded">
                    {exp.period}
                  </span>
                </div>
                <p className="text-blue-600 text-xs font-medium mb-1">{exp.company} | {exp.location}</p>
                <ul className="space-y-1 text-xs text-gray-700">
                  {exp.achievements.slice(0, 2).map((achievement: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-600 mr-1">•</span>
                      <span className="text-xs">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Two-column layout for remaining sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Technical Skills */}
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center">
              <span className="w-6 h-1 bg-purple-600 rounded mr-2"></span>
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-1">
              {data.skills.technical.slice(0, 4).map((skill: string, index: number) => (
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
            <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center">
              <span className="w-6 h-1 bg-green-600 rounded mr-2"></span>
              Education
            </h2>
            <div className="space-y-2">
              {data.education.map((edu: any, index: number) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-900 text-xs">{edu.degree}</h3>
                  <p className="text-gray-600 text-xs">{edu.school}</p>
                  <p className="text-gray-500 text-xs">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center">
              <span className="w-6 h-1 bg-orange-600 rounded mr-2"></span>
              Certifications
            </h2>
            <div className="space-y-1">
              {data.certifications.slice(0, 2).map((cert: string, index: number) => (
                <p key={index} className="text-xs text-gray-700">• {cert}</p>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center">
              <span className="w-6 h-1 bg-teal-600 rounded mr-2"></span>
              Languages
            </h2>
            <div className="space-y-1">
              {data.languages.slice(0, 2).map((lang: string, index: number) => (
                <p key={index} className="text-xs text-gray-700">• {lang}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Executive Template - Executive style
function ExecutiveTemplate({ data }: { data: any }) {
  return (
    <div className="p-4 font-serif bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="text-center mb-4 border-b-4 border-gray-800 pb-3">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          {data.personal.name}
        </h1>
        <p className="text-base text-gray-700 mb-2 font-medium">
          {data.personal.title}
        </p>
        <div className="text-xs text-gray-600 space-y-1">
          <p className="truncate">{data.personal.email} | {data.personal.phone}</p>
          <p className="truncate">{data.personal.location} | {data.personal.linkedin}</p>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="mb-4">
        <h2 className="text-base font-bold text-gray-900 mb-2 border-b-2 border-gray-800 pb-1">
          EXECUTIVE SUMMARY
        </h2>
        <p className="text-gray-700 text-xs leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Core Competencies */}
      <div className="mb-4">
        <h2 className="text-base font-bold text-gray-900 mb-2 border-b-2 border-gray-800 pb-1">
          CORE COMPETENCIES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1 text-xs">Strategic Leadership</h3>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Cross-functional team management</li>
              <li>• Strategic planning and execution</li>
              <li>• Stakeholder relationship building</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1 text-xs">Business Acumen</h3>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Revenue growth and optimization</li>
              <li>• Market analysis and strategy</li>
              <li>• Performance metrics and KPIs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Professional Experience */}
      <div className="mb-4">
        <h2 className="text-base font-bold text-gray-900 mb-2 border-b-2 border-gray-800 pb-1">
          PROFESSIONAL EXPERIENCE
        </h2>
        <div className="space-y-3">
          {data.experience.map((exp: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{exp.title}</h3>
                  <p className="text-sm font-semibold text-gray-700">{exp.company}</p>
                  <p className="text-gray-600 text-xs">{exp.location}</p>
                </div>
                <span className="text-xs text-gray-500">{exp.period}</span>
              </div>
              <ul className="space-y-1 text-xs text-gray-700">
                {exp.achievements.slice(0, 2).map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gray-500 mr-1">•</span>
                    <span className="text-xs">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Credentials */}
      <div className="mb-4">
        <h2 className="text-base font-bold text-gray-900 mb-2 border-b-2 border-gray-800 pb-1">
          EDUCATION & CREDENTIALS
        </h2>
        <div className="space-y-2">
          {data.education.map((edu: any, index: number) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 text-xs">{edu.degree}</h3>
              <p className="text-gray-700 text-xs">{edu.school}</p>
              <p className="text-gray-600 text-xs">{edu.period} | GPA: {edu.gpa}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-2 border-b-2 border-gray-800 pb-1">
          CORE COMPETENCIES
        </h2>
        <div className="flex flex-wrap gap-1">
          {data.skills.technical.slice(0, 4).map((skill: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-800 text-white rounded text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Elegant Template - Elegant and refined
function ElegantTemplate({ data }: { data: any }) {
  return (
    <div className="p-4 font-serif bg-white">
      {/* Header */}
      <div className="text-center mb-4 border-b-2 border-gray-300 pb-3">
        <h1 className="text-xl font-light text-gray-900 mb-1 tracking-wide">
          {data.personal.name}
        </h1>
        <p className="text-base text-gray-600 mb-2 font-medium">
          {data.personal.title}
        </p>
        <div className="text-xs text-gray-500 space-y-1">
          <p className="truncate">{data.personal.email}</p>
          <p className="truncate">{data.personal.phone} | {data.personal.location}</p>
          <p className="truncate">{data.personal.linkedin}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-2 uppercase tracking-wide">
          Professional Summary
        </h2>
        <p className="text-gray-700 text-xs leading-relaxed italic">
          {data.summary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-2 uppercase tracking-wide">
          Professional Experience
        </h2>
        <div className="space-y-3">
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="border-l-4 border-gray-300 pl-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-semibold text-gray-900 text-xs">{exp.title}</h3>
                  <p className="text-gray-600 text-xs font-medium">{exp.company}</p>
                  <p className="text-gray-500 text-xs">{exp.location}</p>
                </div>
                <span className="text-xs text-gray-500 italic">{exp.period}</span>
              </div>
              <ul className="space-y-1 text-xs text-gray-700">
                {exp.achievements.slice(0, 2).map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gray-400 mr-2">◦</span>
                    <span className="text-xs">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2 uppercase tracking-wide">
            Core Competencies
          </h2>
          <div className="space-y-2">
            <div>
              <h3 className="font-medium text-gray-800 mb-1 text-xs">Technical Skills</h3>
              <div className="flex flex-wrap gap-1">
                {data.skills.technical.slice(0, 3).map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="text-gray-700 text-xs border border-gray-300 px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1 text-xs">Leadership Skills</h3>
              <div className="flex flex-wrap gap-1">
                {data.skills.soft.slice(0, 3).map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="text-gray-700 text-xs border border-gray-300 px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu: any, index: number) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900 text-xs">{edu.degree}</h3>
                <p className="text-gray-600 text-xs">{edu.school}</p>
                <p className="text-gray-500 text-xs">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Simple Template - Minimalist design
function SimpleTemplate({ data }: { data: any }) {
  return (
    <div className="p-4 font-sans">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          {data.personal.name}
        </h1>
        <p className="text-base text-gray-600 mb-2">
          {data.personal.title}
        </p>
        <div className="text-xs text-gray-500 space-y-1">
          <p className="truncate">{data.personal.email}</p>
          <p className="truncate">{data.personal.phone}</p>
          <p className="truncate">{data.personal.location}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <h2 className="text-base font-medium text-gray-900 mb-2">Summary</h2>
        <p className="text-gray-700 text-xs leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h2 className="text-base font-medium text-gray-900 mb-3">Experience</h2>
        <div className="space-y-3">
          {data.experience.map((exp: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-gray-900 text-xs">{exp.title}</h3>
                <span className="text-xs text-gray-500">{exp.period}</span>
              </div>
              <p className="text-gray-600 text-xs mb-1">{exp.company}</p>
              <ul className="space-y-1 text-xs text-gray-700">
                {exp.achievements.slice(0, 2).map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gray-500 mr-1">•</span>
                    <span className="text-xs">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-base font-medium text-gray-900 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-1">
          {data.skills.technical.slice(0, 4).map((skill: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Modern Template - Enhanced version
function ModernTemplate({ data }: { data: any }) {
  return (
    <div className="p-4 font-sans">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          {data.personal.name}
        </h1>
        <p className="text-base text-blue-600 font-medium mb-1">
          {data.personal.title}
        </p>
        <div className="flex justify-center space-x-2 text-xs text-gray-600">
          <span className="truncate">{data.personal.email}</span>
          <span>•</span>
          <span className="truncate">{data.personal.phone}</span>
          <span>•</span>
          <span className="truncate">{data.personal.location}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-2 border-b-2 border-blue-600 pb-1">
          Professional Summary
        </h2>
        <p className="text-gray-700 text-xs leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-2 border-b-2 border-blue-600 pb-1">
          Work Experience
        </h2>
        <div className="space-y-3">
          {data.experience.map((exp: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900 text-xs">{exp.title}</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded">
                  {exp.period}
                </span>
              </div>
              <p className="text-blue-600 text-xs font-medium mb-1">{exp.company}</p>
              <ul className="space-y-1 text-xs text-gray-700">
                {exp.achievements.slice(0, 2).map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-600 mr-1">•</span>
                    <span className="text-xs">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-2 border-b-2 border-blue-600 pb-1">
          Skills
        </h2>
        <div className="flex flex-wrap gap-1">
          {data.skills.technical.slice(0, 4).map((skill: string, index: number) => (
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

// Classic Template - Enhanced version
function ClassicTemplate({ data }: { data: any }) {
  return (
    <div className="p-4 font-serif">
      {/* Header */}
      <div className="text-center mb-4 border-b-2 border-gray-300 pb-3">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          {data.personal.name}
        </h1>
        <p className="text-base text-gray-600 mb-2">
          {data.personal.title}
        </p>
        <div className="text-xs text-gray-500 space-y-1">
          <p className="truncate">{data.personal.email}</p>
          <p className="truncate">{data.personal.phone}</p>
          <p className="truncate">{data.personal.location}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <h2 className="text-base font-bold text-gray-900 mb-2">Professional Summary</h2>
        <p className="text-gray-700 text-xs leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h2 className="text-base font-bold text-gray-900 mb-2">Work Experience</h2>
        <div className="space-y-3">
          {data.experience.map((exp: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900 text-xs">{exp.title}</h3>
                <span className="text-xs text-gray-500">{exp.period}</span>
              </div>
              <p className="text-gray-600 text-xs font-medium mb-1">{exp.company}</p>
              <ul className="space-y-1 text-xs text-gray-700">
                {exp.achievements.slice(0, 2).map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gray-500 mr-1">•</span>
                    <span className="text-xs">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-1">
          {data.skills.technical.slice(0, 4).map((skill: string, index: number) => (
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

// Creative Template - Enhanced version
function CreativeTemplate({ data }: { data: any }) {
  return (
    <div className="p-2 sm:p-3 font-sans bg-gradient-to-br from-blue-50 to-indigo-50 min-h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 sm:p-3 rounded-lg mb-2 sm:mb-3">
        <h1 className="text-sm sm:text-base font-bold mb-1">
          {data.personal.name}
        </h1>
        <p className="text-xs sm:text-sm opacity-90 mb-2">
          {data.personal.title}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs opacity-80">
          <div className="flex items-center min-w-0">
            <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="truncate">{data.personal.email}</span>
          </div>
          <div className="flex items-center min-w-0">
            <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="truncate">{data.personal.phone}</span>
          </div>
          <div className="flex items-center min-w-0 sm:col-span-2">
            <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="truncate">{data.personal.location}</span>
          </div>
        </div>
      </div>

      {/* Use vertical layout instead of multi-column grid */}
      <div className="space-y-2 sm:space-y-3">
        {/* Summary - Full width */}
        <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
          <h2 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 sm:mb-2 flex items-center">
            <span className="w-3 h-0.5 sm:w-4 sm:h-1 bg-blue-600 rounded mr-1 sm:mr-2"></span>
            Summary
          </h2>
          <p className="text-gray-700 text-xs leading-relaxed">
            {data.summary}
          </p>
        </div>

        {/* Experience - Full width */}
        <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
          <h2 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3 flex items-center">
            <span className="w-3 h-0.5 sm:w-4 sm:h-1 bg-blue-600 rounded mr-1 sm:mr-2"></span>
            Experience
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="relative pl-3 sm:pl-4 border-l-2 border-blue-200">
                <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full -left-0.5 sm:-left-1 top-0.5 sm:top-1"></div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1 sm:gap-0">
                  <h3 className="font-semibold text-gray-900 text-xs">{exp.title}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded self-start">
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-600 text-xs font-medium mb-1">{exp.company}</p>
                <ul className="space-y-1 text-xs text-gray-700">
                  {exp.achievements.slice(0, 2).map((achievement: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-600 mr-1 text-xs">•</span>
                      <span className="text-xs">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Two-column layout for remaining sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
          {/* Skills */}
          <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
            <h2 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 sm:mb-2 flex items-center">
              <span className="w-3 h-0.5 sm:w-4 sm:h-1 bg-blue-600 rounded mr-1 sm:mr-2"></span>
              Skills
            </h2>
            <div className="flex flex-wrap gap-1">
              {data.skills.technical.slice(0, 4).map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
            <h2 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 sm:mb-2 flex items-center">
              <span className="w-3 h-0.5 sm:w-4 sm:h-1 bg-blue-600 rounded mr-1 sm:mr-2"></span>
              Education
            </h2>
            <div className="space-y-2">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="relative pl-3 sm:pl-4 border-l-2 border-blue-200">
                  <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full -left-0.5 sm:-left-1 top-0.5 sm:top-1"></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1 sm:gap-0">
                    <h3 className="font-semibold text-gray-900 text-xs">{edu.degree}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded self-start">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs font-medium">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
            <h2 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 sm:mb-2 flex items-center">
              <span className="w-3 h-0.5 sm:w-4 sm:h-1 bg-blue-600 rounded mr-1 sm:mr-2"></span>
              Certifications
            </h2>
            <div className="space-y-1">
              {data.certifications.slice(0, 2).map((cert: string, index: number) => (
                <p key={index} className="text-xs text-gray-700">• {cert}</p>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
            <h2 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 sm:mb-2 flex items-center">
              <span className="w-3 h-0.5 sm:w-4 sm:h-1 bg-blue-600 rounded mr-1 sm:mr-2"></span>
              Languages
            </h2>
            <div className="space-y-1">
              {data.languages.slice(0, 2).map((lang: string, index: number) => (
                <p key={index} className="text-xs text-gray-700">• {lang}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Minimal Template - Enhanced version
function MinimalTemplate({ data }: { data: any }) {
  return (
    <div className="p-4 font-sans">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-light text-gray-900 mb-1">
          {data.personal.name}
        </h1>
        <p className="text-base text-gray-600 mb-2">
          {data.personal.title}
        </p>
        <div className="text-xs text-gray-500 space-y-1">
          <p className="truncate">{data.personal.email}</p>
          <p className="truncate">{data.personal.phone}</p>
          <p className="truncate">{data.personal.location}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <h2 className="text-base font-medium text-gray-900 mb-2">Summary</h2>
        <p className="text-gray-700 text-xs leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h2 className="text-base font-medium text-gray-900 mb-3">Experience</h2>
        <div className="space-y-3">
          {data.experience.map((exp: any, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-gray-900 text-xs">{exp.title}</h3>
                <span className="text-xs text-gray-500">{exp.period}</span>
              </div>
              <p className="text-gray-600 text-xs mb-1">{exp.company}</p>
              <ul className="space-y-1 text-xs text-gray-700">
                {exp.achievements.slice(0, 2).map((achievement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gray-500 mr-1">•</span>
                    <span className="text-xs">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-base font-medium text-gray-900 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-1">
          {data.skills.technical.slice(0, 4).map((skill: string, index: number) => (
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