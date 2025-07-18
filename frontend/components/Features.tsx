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
    title: 'features.aiWriting.title',
    description: 'features.aiWriting.description'
  },
  {
    icon: GlobeAltIcon,
    title: 'features.multiLanguage.title',
    description: 'features.multiLanguage.description'
  },
  {
    icon: DocumentTextIcon,
    title: 'features.templates.title',
    description: 'features.templates.description'
  },
  {
    icon: ArrowDownTrayIcon,
    title: 'features.export.title',
    description: 'features.export.description'
  },
  {
    icon: ShieldCheckIcon,
    title: 'features.privacy.title',
    description: 'features.privacy.description'
  },
  {
    icon: CloudArrowUpIcon,
    title: 'features.hosting.title',
    description: 'features.hosting.description'
  }
]

export function Features() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('features.sectionTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('features.sectionSubtitle')}
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
                {t(feature.description)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 