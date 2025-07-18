'use client'

import { useTranslation } from 'react-i18next'
import { 
  SparklesIcon, 
  GlobeAltIcon, 
  DocumentTextIcon, 
  ArrowDownTrayIcon, 
  ShieldCheckIcon, 
  CloudArrowUpIcon 
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: SparklesIcon,
    title: 'features.aiWriting',
    description: '使用AI技术智能优化简历内容，提供专业的写作建议'
  },
  {
    icon: GlobeAltIcon,
    title: 'features.multiLanguage',
    description: '支持中文、英文等多种语言，满足国际化需求'
  },
  {
    icon: DocumentTextIcon,
    title: 'features.templates',
    description: '提供多种专业简历模板，一键切换不同风格'
  },
  {
    icon: ArrowDownTrayIcon,
    title: 'features.export',
    description: '支持PDF、Word、HTML等多种格式导出'
  },
  {
    icon: ShieldCheckIcon,
    title: 'features.privacy',
    description: '本地存储，数据安全，保护用户隐私'
  },
  {
    icon: CloudArrowUpIcon,
    title: 'features.hosting',
    description: '提供在线简历托管服务，生成专属链接'
  }
]

export function Features() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            强大的功能特性
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们提供全方位的简历制作功能，让您的求职之路更加顺畅
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {t(feature.title)}
                </h3>
              </div>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 