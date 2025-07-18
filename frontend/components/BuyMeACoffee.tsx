'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Coffee, Heart, Star } from 'lucide-react'

export function BuyMeACoffee() {
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white rounded-full shadow-lg px-6 py-3 mb-8">
              <Coffee className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-medium text-gray-700">
                {t('buyMeACoffee.badge', 'Support WeCV AI')}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('buyMeACoffee.title', 'Love WeCV AI?')}
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('buyMeACoffee.subtitle', 'If you find our AI-powered resume builder helpful, consider buying us a coffee to support the development of more amazing features!')}
            </p>
          </motion.div>

          {/* Coffee Options */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Small Coffee */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-amber-200 hover:border-amber-300 transition-all duration-200 hover:shadow-xl">
              <div className="text-center">
                <Coffee className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('buyMeACoffee.small.title', 'Small Coffee')}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {t('buyMeACoffee.small.description', 'Perfect for a quick thank you')}
                </p>
                <div className="text-2xl font-bold text-amber-600 mb-4">
                  $3
                </div>
                <button 
                  className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium"
                  onClick={() => window.open('https://buymeacoffee.com/wecvai', '_blank')}
                >
                  {t('buyMeACoffee.buyNow', 'Buy Now')}
                </button>
              </div>
            </div>

            {/* Medium Coffee */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-amber-400 hover:border-amber-500 transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1">
              <div className="text-center">
                <div className="relative">
                  <Coffee className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <Heart className="w-6 h-6 text-red-500 absolute -top-2 -right-2" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('buyMeACoffee.medium.title', 'Medium Coffee')}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {t('buyMeACoffee.medium.description', 'Great for regular users')}
                </p>
                <div className="text-2xl font-bold text-amber-600 mb-4">
                  $5
                </div>
                <button 
                  className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium"
                  onClick={() => window.open('https://buymeacoffee.com/wecvai', '_blank')}
                >
                  {t('buyMeACoffee.buyNow', 'Buy Now')}
                </button>
              </div>
            </div>

            {/* Large Coffee */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-amber-600 hover:border-amber-700 transition-all duration-200 hover:shadow-xl">
              <div className="text-center">
                <div className="relative">
                  <Coffee className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <Star className="w-6 h-6 text-yellow-500 absolute -top-2 -right-2" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('buyMeACoffee.large.title', 'Large Coffee')}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {t('buyMeACoffee.large.description', 'For power users and supporters')}
                </p>
                <div className="text-2xl font-bold text-amber-600 mb-4">
                  $10
                </div>
                <button 
                  className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium"
                  onClick={() => window.open('https://buymeacoffee.com/wecvai', '_blank')}
                >
                  {t('buyMeACoffee.buyNow', 'Buy Now')}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {t('buyMeACoffee.features.support.title', 'Support Development')}
              </h4>
              <p className="text-sm text-gray-600">
                {t('buyMeACoffee.features.support.description', 'Help us build better features')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {t('buyMeACoffee.features.priority.title', 'Priority Support')}
              </h4>
              <p className="text-sm text-gray-600">
                {t('buyMeACoffee.features.priority.description', 'Get faster response times')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Coffee className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {t('buyMeACoffee.features.features.title', 'Early Access')}
              </h4>
              <p className="text-sm text-gray-600">
                {t('buyMeACoffee.features.features.description', 'Try new features first')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {t('buyMeACoffee.features.community.title', 'Community')}
              </h4>
              <p className="text-sm text-gray-600">
                {t('buyMeACoffee.features.community.description', 'Join our supporter community')}
              </p>
            </div>
          </motion.div>

          {/* Alternative Support */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('buyMeACoffee.alternative.title', 'Other Ways to Support')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="font-medium text-gray-900 mb-2">
                  {t('buyMeACoffee.alternative.share.title', 'Share with Friends')}
                </h4>
                <p className="text-sm text-gray-600">
                  {t('buyMeACoffee.alternative.share.description', 'Tell others about WeCV AI')}
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-medium text-gray-900 mb-2">
                  {t('buyMeACoffee.alternative.feedback.title', 'Give Feedback')}
                </h4>
                <p className="text-sm text-gray-600">
                  {t('buyMeACoffee.alternative.feedback.description', 'Help us improve the platform')}
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-medium text-gray-900 mb-2">
                  {t('buyMeACoffee.alternative.review.title', 'Leave a Review')}
                </h4>
                <p className="text-sm text-gray-600">
                  {t('buyMeACoffee.alternative.review.description', 'Rate us on social media')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 