'use client'

import { useTranslation } from 'react-i18next'

const plans = [
  {
    nameKey: 'pricing.free.name',
    price: '¥0',
    period: '/月',
    features: [
      'pricing.free.features.templates',
      'pricing.free.features.aiAssistant',
      'pricing.free.features.pdfExport',
      'pricing.free.features.basicSupport'
    ],
    popular: false,
    ctaKey: 'pricing.free.cta'
  },
  {
    nameKey: 'pricing.pro.name',
    price: '¥29',
    period: '/月',
    features: [
      'pricing.pro.features.allTemplates',
      'pricing.pro.features.advancedAI',
      'pricing.pro.features.multipleFormats',
      'pricing.pro.features.onlineHosting',
      'pricing.pro.features.prioritySupport',
      'pricing.pro.features.noAds'
    ],
    popular: true,
    ctaKey: 'pricing.pro.cta'
  },
  {
    nameKey: 'pricing.enterprise.name',
    price: '¥99',
    period: '/月',
    features: [
      'pricing.enterprise.features.allProFeatures',
      'pricing.enterprise.features.customAI',
      'pricing.enterprise.features.teamCollaboration',
      'pricing.enterprise.features.advancedAnalytics',
      'pricing.enterprise.features.apiAccess',
      'pricing.enterprise.features.dedicatedSupport'
    ],
    popular: false,
    ctaKey: 'pricing.enterprise.cta'
  }
]

export function Pricing() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('pricing.sectionTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('pricing.sectionSubtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`card relative ${
                plan.popular 
                  ? 'ring-2 ring-primary-500 shadow-xl' 
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {t('pricing.mostPopular')}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t(plan.nameKey)}
                </h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-1">
                    {plan.period}
                  </span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg 
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span className="text-gray-700">{t(feature)}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                  plan.popular
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {t(plan.ctaKey)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 