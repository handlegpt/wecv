'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { TemplatePreview } from './TemplatePreview'

const templates = [
  {
    id: 'impact',
    nameKey: 'Impact Professional',
    descriptionKey: 'Emphasizes achievements and quantifiable results with bold design',
    categoryKey: 'Executive',
    image: '/templates/impact.jpg'
  },
  {
    id: 'clean',
    nameKey: 'Clean Minimalist',
    descriptionKey: 'Simple and clean design focusing on content clarity',
    categoryKey: 'Professional',
    image: '/templates/clean.jpg'
  },
  {
    id: 'contemporary',
    nameKey: 'Contemporary Modern',
    descriptionKey: 'Modern design with balanced professional and creative elements',
    categoryKey: 'Modern',
    image: '/templates/contemporary.jpg'
  },
  {
    id: 'executive',
    nameKey: 'Executive Leadership',
    descriptionKey: 'Sophisticated design for senior management positions',
    categoryKey: 'Executive',
    image: '/templates/executive.jpg'
  },
  {
    id: 'elegant',
    nameKey: 'Elegant Professional',
    descriptionKey: 'Refined design with sophisticated typography and layout',
    categoryKey: 'Creative',
    image: '/templates/elegant.jpg'
  },
  {
    id: 'modern',
    nameKey: 'Modern Professional',
    descriptionKey: 'Clean and contemporary design with strong visual hierarchy',
    categoryKey: 'Modern',
    image: '/templates/modern.jpg'
  },
  {
    id: 'classic',
    nameKey: 'Classic Traditional',
    descriptionKey: 'Timeless design suitable for all industries',
    categoryKey: 'Classic',
    image: '/templates/classic.jpg'
  },
  {
    id: 'creative',
    nameKey: 'Creative Portfolio',
    descriptionKey: 'Bold and innovative design for creative professionals',
    categoryKey: 'Creative',
    image: '/templates/creative.jpg'
  }
]

export function Templates() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('templates.sectionTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('templates.sectionSubtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template) => (
            <div 
              key={template.id}
              className="card hover:shadow-lg transition-shadow duration-300"
            >
              {/* Template Preview */}
              <div className="aspect-[3/4] bg-gray-50 rounded-lg mb-4 overflow-hidden">
                <TemplatePreview 
                  templateId={template.id} 
                  className="w-full h-full transform scale-75 origin-top"
                />
              </div>
              
              <div className="mb-2">
                <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                  {template.categoryKey}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {template.nameKey}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {template.descriptionKey}
              </p>
              <Link 
                href={`/builder?template=${template.id}`}
                className="btn-primary w-full text-center"
              >
                {t('templates.useTemplate')}
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/templates"
            className="btn-secondary text-lg px-8 py-3"
          >
            {t('templates.viewMore')}
          </Link>
        </div>
      </div>
    </section>
  )
}