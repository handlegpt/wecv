'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            WeCV AI - 智能AI简历生成与管理平台
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            用AI高效打造专业简历，支持多语言、多模板、多格式导出，永久免费。
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href="/builder"
              className="btn-primary text-lg px-8 py-4"
            >
              {t('hero.cta')}
            </Link>
            <Link 
              href="/templates"
              className="btn-secondary text-lg px-8 py-4"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </motion.div>
        </div>
        
        {/* 装饰性元素 */}
        <motion.div 
          className="absolute top-10 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-32 h-32 bg-secondary-200 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  )
} 