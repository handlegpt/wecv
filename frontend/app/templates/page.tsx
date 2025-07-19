'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { TemplatePreview } from '@/components/TemplatePreview'
import { Eye, Play, Star, Users, Clock } from 'lucide-react'

interface Template {
  id: string
  name: string
  category: string
  description: string
  image: string
  features?: string[]
  popularity?: number
  difficulty?: 'easy' | 'medium' | 'hard'
}

export default function TemplatesPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const categories = [
    { id: 'all', name: t('ResumeTemplates.allCategories'), count: 0 },
    { id: 'professional', name: t('ResumeTemplates.business'), count: 0 },
    { id: 'creative', name: t('ResumeTemplates.creative'), count: 0 },
    { id: 'modern', name: t('templates.modern.name'), count: 0 },
    { id: 'classic', name: t('templates.classic.name'), count: 0 },
    { id: 'minimal', name: t('templates.minimal.name'), count: 0 },
    { id: 'executive', name: 'Executive', count: 0 }
  ]

  // 改进的模板数据
  const mockTemplates: Template[] = [
    {
      id: 'impact',
      name: t('templates.impact.name'),
      category: 'executive',
      description: t('templates.impact.description'),
      image: '/templates/impact.jpg',
      features: ['ATS Optimized', 'Achievement Focused', 'Professional'],
      popularity: 95,
      difficulty: 'medium'
    },
    {
      id: 'clean',
      name: t('templates.clean.name'),
      category: 'professional',
      description: t('templates.clean.description'),
      image: '/templates/clean.jpg',
      features: ['Clean Design', 'Easy to Read', 'Professional'],
      popularity: 88,
      difficulty: 'easy'
    },
    {
      id: 'contemporary',
      name: t('templates.contemporary.name'),
      category: 'modern',
      description: t('templates.contemporary.description'),
      image: '/templates/contemporary.jpg',
      features: ['Modern Layout', 'Balanced Design', 'Versatile'],
      popularity: 92,
      difficulty: 'medium'
    },
    {
      id: 'executive',
      name: t('templates.executive.name'),
      category: 'executive',
      description: t('templates.executive.description'),
      image: '/templates/executive.jpg',
      features: ['Leadership Focus', 'Sophisticated', 'High Impact'],
      popularity: 90,
      difficulty: 'hard'
    },
    {
      id: 'elegant',
      name: t('templates.elegant.name'),
      category: 'creative',
      description: t('templates.elegant.description'),
      image: '/templates/elegant.jpg',
      features: ['Elegant Typography', 'Creative Layout', 'Unique'],
      popularity: 85,
      difficulty: 'medium'
    },
    {
      id: 'modern',
      name: t('templates.modern.name'),
      category: 'modern',
      description: t('templates.modern.description'),
      image: '/templates/modern.jpg',
      features: ['Contemporary', 'Clean Lines', 'Professional'],
      popularity: 96,
      difficulty: 'easy'
    },
    {
      id: 'classic',
      name: t('templates.classic.name'),
      category: 'classic',
      description: t('templates.classic.description'),
      image: '/templates/classic.jpg',
      features: ['Timeless', 'Traditional', 'Reliable'],
      popularity: 82,
      difficulty: 'easy'
    },
    {
      id: 'creative',
      name: t('templates.creative.name'),
      category: 'creative',
      description: t('templates.creative.description'),
      image: '/templates/creative.jpg',
      features: ['Innovative', 'Colorful', 'Creative'],
      popularity: 78,
      difficulty: 'medium'
    },
    {
      id: 'minimal',
      name: t('templates.minimal.name'),
      category: 'minimal',
      description: t('templates.minimal.description'),
      image: '/templates/minimal.jpg',
      features: ['Minimalist', 'Content Focus', 'Clean'],
      popularity: 87,
      difficulty: 'easy'
    },
    {
      id: 'simple',
      name: t('templates.simple.name'),
      category: 'minimal',
      description: t('templates.simple.description'),
      image: '/templates/simple.jpg',
      features: ['Ultra Simple', 'Maximum Readability', 'Basic'],
      popularity: 80,
      difficulty: 'easy'
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

  // 更新分类计数
  useEffect(() => {
    const categoryCounts = categories.map(cat => ({
      ...cat,
      count: cat.id === 'all' ? templates.length : templates.filter(t => t.category === cat.id).length
    }))
    // 这里可以更新categories状态，但为了简化，我们直接使用
  }, [templates])

  const handleTemplateSelect = (templateId: string) => {
    router.push(`/builder?template=${templateId}`)
  }

  const handleTemplatePreview = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const closePreview = () => {
    setSelectedTemplate(null)
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
                  {category.id !== 'all' && (
                    <span className="ml-1 text-xs opacity-75">
                      ({templates.filter(t => t.category === category.id).length})
                    </span>
                  )}
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
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                {/* Template Preview */}
                <div className="aspect-[3/4] bg-gray-50 p-4 relative">
                  <TemplatePreview 
                    templateId={template.id} 
                    className="w-full h-full"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <button
                        onClick={() => handleTemplatePreview(template.id)}
                        className="bg-white text-gray-900 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="w-4 h-4 inline mr-1" />
                        Preview
                      </button>
                      <button
                        onClick={() => handleTemplateSelect(template.id)}
                        className="bg-primary-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                      >
                        <Play className="w-4 h-4 inline mr-1" />
                        Use
                      </button>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                      {template.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {template.popularity}%
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {template.description}
                  </p>

                  {/* Features */}
                  {template.features && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {template.features.slice(0, 2).map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                        {template.features.length > 2 && (
                          <span className="text-xs text-gray-500">+{template.features.length - 2} more</span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleTemplateSelect(template.id)}
                      className="flex-1 btn-primary text-sm py-2"
                    >
                      {t('ResumeTemplates.useTemplate')}
                    </button>
                    <button 
                      onClick={() => handleTemplatePreview(template.id)}
                      className="btn-secondary text-sm py-2 px-3"
                    >
                      <Eye className="w-4 h-4" />
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

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {templates.find(t => t.id === selectedTemplate)?.name} Template
                </h2>
                <button
                  onClick={closePreview}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <TemplatePreview 
                    templateId={selectedTemplate} 
                    className="w-full"
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Template Features</h3>
                  <ul className="space-y-2 mb-6">
                    {templates.find(t => t.id === selectedTemplate)?.features?.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Popularity</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">
                          {templates.find(t => t.id === selectedTemplate)?.popularity}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Difficulty</span>
                      <span className="text-sm font-medium capitalize">
                        {templates.find(t => t.id === selectedTemplate)?.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        handleTemplateSelect(selectedTemplate)
                        closePreview()
                      }}
                      className="btn-primary w-full"
                    >
                      Use This Template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 