'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Globe, 
  FileText, 
  Download, 
  Shield, 
  Cloud,
  Zap,
  Users,
  CheckCircle
} from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'features.aiWriting.title',
    description: 'features.aiWriting.description',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Globe,
    title: 'features.multiLanguage.title',
    description: 'features.multiLanguage.description',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: FileText,
    title: 'features.templates.title',
    description: 'features.templates.description',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Download,
    title: 'features.export.title',
    description: 'features.export.description',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Shield,
    title: 'features.privacy.title',
    description: 'features.privacy.description',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Cloud,
    title: 'features.hosting.title',
    description: 'features.hosting.description',
    color: 'from-teal-500 to-blue-500'
  }
]

const stats = [
  { icon: Users, value: '50,000+', label: 'Active Users' },
  { icon: CheckCircle, value: '98%', label: 'Success Rate' },
  { icon: Zap, value: '2.5M+', label: 'Resumes Created' }
]

export function Features() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('features.sectionTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('features.sectionSubtitle')}
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-gray-50 to-white">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
                  {t(feature.title)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(feature.description)}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to create your professional resume?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of professionals who have already transformed their careers with WeCV AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                Start Creating Now
              </button>
              <button className="btn-secondary text-lg px-8 py-4 border-2 border-gray-300 hover:border-blue-300 transform hover:-translate-y-1 transition-all duration-200">
                View Templates
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 