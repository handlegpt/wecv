'use client'

import { useTranslation } from 'react-i18next'
import { Users, Target, Award, Globe, Zap, Shield } from 'lucide-react'

export default function AboutPage() {
  const { t } = useTranslation()

  const values = [
    {
      icon: Zap,
      title: t('about.values.innovation.title', 'Innovation'),
      description: t('about.values.innovation.description', 'We continuously push the boundaries of AI technology to create cutting-edge resume solutions.')
    },
    {
      icon: Users,
      title: t('about.values.userFirst.title', 'User First'),
      description: t('about.values.userFirst.description', 'Every feature we build is designed with our users\' success in mind.')
    },
    {
      icon: Shield,
      title: t('about.values.security.title', 'Security'),
      description: t('about.values.security.description', 'Your data privacy and security are our top priorities.')
    },
    {
      icon: Globe,
      title: t('about.values.global.title', 'Global Reach'),
      description: t('about.values.global.description', 'We serve professionals worldwide with multi-language support.')
    }
  ]

  const stats = [
    { number: '100,000+', label: t('about.stats.users', 'Active Users') },
    { number: '50+', label: t('about.stats.countries', 'Countries') },
    { number: '10+', label: t('about.stats.templates', 'Resume Templates') },
    { number: '95%', label: t('about.stats.satisfaction', 'Satisfaction Rate') }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {t('about.title', 'About WeCV AI')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('about.subtitle', 'WeCV AI is revolutionizing the way professionals create resumes. Our AI-powered platform combines cutting-edge technology with intuitive design to help job seekers worldwide land their dream jobs.')}
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">{t('about.mission.title', 'Our Mission')}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {t('about.mission.description', 'To democratize professional resume creation by making AI-powered tools accessible to everyone. We believe that every professional deserves the opportunity to present their best self to potential employers.')}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center mb-6">
              <Award className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">{t('about.vision.title', 'Our Vision')}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {t('about.vision.description', 'To become the world\'s leading AI-powered career platform, helping millions of professionals advance their careers through intelligent resume creation and career guidance.')}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{t('about.stats.title', 'Our Impact')}</h2>
            <p className="text-blue-100 text-lg">{t('about.stats.subtitle', 'Join thousands of professionals who have transformed their careers with WeCV AI')}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.values.title', 'Our Values')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.values.subtitle', 'These core values guide everything we do at WeCV AI')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="flex justify-center mb-4">
                <value.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.story.title', 'Our Story')}</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {t('about.story.paragraph1', 'WeCV AI was born from a simple observation: creating a professional resume shouldn\'t be complicated or expensive. In today\'s competitive job market, every detail matters, and traditional resume builders often fall short.')}
                </p>
                <p>
                  {t('about.story.paragraph2', 'Our team of AI researchers, designers, and career experts came together to build something different. We combined the power of artificial intelligence with intuitive design to create a platform that not only helps you build beautiful resumes but also guides you through the process with intelligent suggestions.')}
                </p>
                <p>
                  {t('about.story.paragraph3', 'Today, WeCV AI serves professionals in over 50 countries, helping them create resumes that stand out and get results. We\'re proud to be part of their career journey and committed to continuously improving our platform.')}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('about.why.title', 'Why Choose WeCV AI?')}</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">{t('about.why.reason1', 'AI-powered content suggestions and optimization')}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">{t('about.why.reason2', 'Professional templates designed by career experts')}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">{t('about.why.reason3', 'Multi-language support for global professionals')}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">{t('about.why.reason4', 'Real-time preview and instant updates')}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">{t('about.why.reason5', 'Secure and privacy-focused platform')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.cta.title', 'Ready to Transform Your Career?')}</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('about.cta.subtitle', 'Join thousands of professionals who have already created stunning resumes with WeCV AI.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/builder" className="btn-primary text-lg px-8 py-3">
              {t('about.cta.startCreating', 'Start Creating')}
            </a>
            <a href="/templates" className="btn-secondary text-lg px-8 py-3">
              {t('about.cta.viewTemplates', 'View Templates')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 