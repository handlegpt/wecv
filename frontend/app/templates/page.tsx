'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
    { id: 'all', name: t('ResumeTemplates.all') },
    { id: 'professional', name: t('ResumeTemplates.professional') },
    { id: 'creative', name: t('ResumeTemplates.creative') },
    { id: 'modern', name: t('ResumeTemplates.modern') },
    { id: 'classic', name: t('ResumeTemplates.classic') },
    { id: 'minimal', name: t('ResumeTemplates.minimal') }
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
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error)
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
          <p className="mt-4 text-gray-600">{t('Common.loading')}</p>
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
              Create New Resume
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
                <div className="aspect-[3/4] bg-gray-200 flex items-center justify-center">
                  <div className="text-gray-500 text-sm text-center p-4">
                    <div className="w-16 h-20 bg-white border-2 border-gray-300 mx-auto mb-2"></div>
                    {template.name} {t('ResumeTemplates.preview')}
                  </div>
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
                      {t('ResumeTemplates.preview')}
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