'use client'

import { useTranslation } from 'react-i18next'
import { SparklesIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline'

export function Pricing() {
  const { t } = useTranslation()

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('pricing.sectionTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('pricing.sectionSubtitle')}
          </p>
        </div>
        
        {/* Coming Soon Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-12 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
                <SparklesIcon className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {t('pricing.comingSoon.title', 'Coming Soon')}
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {t('pricing.comingSoon.description', 'We are working hard to bring you amazing pricing plans. Stay tuned for exclusive early access and special offers!')}
              </p>
            </div>
            
            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <StarIcon className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {t('pricing.comingSoon.freePlan', 'Free Plan')}
                </h4>
                <p className="text-sm text-gray-600 text-center">
                  {t('pricing.comingSoon.freeDescription', 'Basic features to get you started')}
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <SparklesIcon className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {t('pricing.comingSoon.proPlan', 'Pro Plan')}
                </h4>
                <p className="text-sm text-gray-600 text-center">
                  {t('pricing.comingSoon.proDescription', 'Advanced features for professionals')}
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <ClockIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {t('pricing.comingSoon.enterprisePlan', 'Enterprise Plan')}
                </h4>
                <p className="text-sm text-gray-600 text-center">
                  {t('pricing.comingSoon.enterpriseDescription', 'Custom solutions for teams')}
                </p>
              </div>
            </div>
            
            {/* CTA */}
            <div className="space-y-4">
              <button className="btn-primary text-lg px-8 py-3">
                {t('pricing.comingSoon.notifyMe', 'Notify Me When Available')}
              </button>
              <p className="text-sm text-gray-500">
                {t('pricing.comingSoon.earlyAccess', 'Get early access and special discounts')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 