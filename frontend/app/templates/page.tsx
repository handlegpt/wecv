'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { TemplatePreview } from '@/components/TemplatePreview'

interface Template {
  id: string
  name: string
  category: string
  description: string
  image: string
}

export default function TemplatesPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    { id: 'all', name: t('ResumeTemplates.allCategories') },
    { id: 'professional', name: t('ResumeTemplates.business') },
    { id: 'creative', name: t('ResumeTemplates.creative') },
    { id: 'modern', name: t('templates.modern.name') },
    { id: 'classic', name: t('templates.classic.name') },
    { id: 'minimal', name: t('templates.minimal.name') }
  ]

  // 模拟模板数据，因为后端可能还没有实现
  const mockTemplates: Template[] = [
    {
      id: 'impact',
      name: t('templates.impact.name'),
      category: 'executive',
      description: t('templates.impact.description'),
      image: '/templates/impact.jpg'
    },
    {
      id: 'clean',
      name: t('templates.clean.name'),
      category: 'professional',
      description: t('templates.clean.description'),
      image: '/templates/clean.jpg'
    },
    {
      id: 'contemporary',
      name: t('templates.contemporary.name'),
      category: 'modern',
      description: t('templates.contemporary.description'),
      image: '/templates/contemporary.jpg'
    },
    {
      id: 'executive',
      name: t('templates.executive.name'),
      category: 'executive',
      description: t('templates.executive.description'),
      image: '/templates/executive.jpg'
    },
    {
      id: 'elegant',
      name: t('templates.elegant.name'),
      category: 'creative',
      description: t('templates.elegant.description'),
      image: '/templates/elegant.jpg'
    },
    {
      id: 'modern',
      name: t('templates.modern.name'),
      category: 'modern',
      description: t('templates.modern.description'),
      image: '/templates/modern.jpg'
    },
    {
      id: 'classic',
      name: t('templates.classic.name'),
      category: 'classic',
      description: t('templates.classic.description'),
      image: '/templates/classic.jpg'
    },
    {
      id: 'creative',
      name: t('templates.creative.name'),
      category: 'creative',
      description: t('templates.creative.description'),
      image: '/templates/creative.jpg'
    },
    {
      id: 'minimal',
      name: t('templates.minimal.name'),
      category: 'minimal',
      description: t('templates.minimal.description'),
      image: '/templates/minimal.jpg'
    },
    {
      id: 'simple',
      name: t('templates.simple.name'),
      category: 'minimal',
      description: t('templates.simple.description'),
      image: '/templates/simple.jpg'
    }
  ]

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/template`)
      if (response.ok) {
        const data = await response.json()
        setTemplates(data)
      } else {
        // 如果后端API不可用，使用模拟数据
        setTemplates(mockTemplates)
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error)
      // 使用模拟数据作为后备
      setTemplates(mockTemplates)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleTemplateSelect = (templateId: string) => {
    router.push(`/builder?template=${templateId}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('messages.loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('ResumeTemplates.title')}</h1>
              <p className="text-gray-600 mt-2">Choose from our collection of professional resume templates</p>
            </div>
            <Link 
              href="/builder"
              className="btn-primary"
            >
              {t('buttons.create')}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full sm:w-96">
              <input
                type="text"
                placeholder={t('ResumeTemplates.searchTemplates')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <div 
                key={template.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/* Template Preview */}
                <div className="aspect-[3/4] bg-gray-50 p-2">
                  <TemplatePreview 
                    templateId={template.id} 
                    className="w-full h-full transform scale-75 origin-top"
                  />
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {template.description}
                  </p>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleTemplateSelect(template.id)}
                      className="flex-1 btn-primary text-sm py-2"
                    >
                      {t('ResumeTemplates.useTemplate')}
                    </button>
                    <button className="btn-secondary text-sm py-2 px-3">
                      {t('templates.preview')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('ResumeTemplates.noTemplates')}</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 