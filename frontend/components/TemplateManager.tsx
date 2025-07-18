'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import { 
  EyeIcon, 
  CheckIcon, 
  StarIcon, 
  DocumentTextIcon,
  SparklesIcon,
  CogIcon
} from '@heroicons/react/24/outline'

interface Template {
  id: string
  name: string
  category: string
  description: string
  preview: string
  isPopular: boolean
  isNew: boolean
  supportedLanguages: string[]
  colorScheme: string
}

interface TemplateManagerProps {
  onTemplateSelect: (templateId: string) => void
  selectedTemplate?: string
  showPreview?: boolean
}

export default function TemplateManager({ 
  onTemplateSelect, 
  selectedTemplate, 
  showPreview = true 
}: TemplateManagerProps) {
  const { t } = useTranslation()
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    { id: 'all', name: '全部模板', icon: DocumentTextIcon },
    { id: 'professional', name: '专业模板', icon: StarIcon },
    { id: 'creative', name: '创意模板', icon: SparklesIcon },
    { id: 'modern', name: '现代模板', icon: CogIcon },
    { id: 'minimalist', name: '简约模板', icon: EyeIcon }
  ]

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/template`)
      if (response.ok) {
        const data = await response.json()
        setTemplates(data)
      } else {
        toast.error('获取模板失败')
      }
    } catch (error) {
      toast.error('网络错误')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredTemplates = templates.filter(template => 
    selectedCategory === 'all' || template.category === selectedCategory
  )

  const handleTemplateSelect = (template: Template) => {
    onTemplateSelect(template.id)
    if (showPreview) {
      setPreviewTemplate(template)
    }
  }

  const renderTemplateCard = (template: Template) => (
    <div
      key={template.id}
      className={`relative bg-white rounded-lg shadow-md border-2 transition-all cursor-pointer hover:shadow-lg ${
        selectedTemplate === template.id 
          ? 'border-primary-500 bg-primary-50' 
          : 'border-gray-200 hover:border-primary-300'
      }`}
      onClick={() => handleTemplateSelect(template)}
    >
      {/* Template Badges */}
      <div className="absolute top-2 left-2 flex space-x-1">
        {template.isPopular && (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
            热门
          </span>
        )}
        {template.isNew && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            新
          </span>
        )}
      </div>

      {/* Template Preview */}
      <div className="aspect-[3/4] bg-gray-100 rounded-t-lg overflow-hidden">
        {template.preview ? (
          <img 
            src={template.preview} 
            alt={template.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <DocumentTextIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>

      {/* Template Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900">{template.name}</h3>
          {selectedTemplate === template.id && (
            <CheckIcon className="w-5 h-5 text-primary-600" />
          )}
        </div>
        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
        
        {/* Language Support */}
        <div className="flex flex-wrap gap-1 mb-3">
          {template.supportedLanguages.slice(0, 3).map((lang, index) => (
            <span 
              key={lang}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {lang}
            </span>
          ))}
          {template.supportedLanguages.length > 3 && (
            <span className="text-xs text-gray-500">
              +{template.supportedLanguages.length - 3}
            </span>
          )}
        </div>

        {/* Color Scheme */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">配色:</span>
          <div className="flex space-x-1">
            {template.colorScheme.split(',').map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: color.trim() }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">选择模板类型</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                selectedCategory === category.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            简历模板 ({filteredTemplates.length})
          </h3>
          {isLoading && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
              <span>加载中...</span>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(renderTemplateCard)}
          </div>
        )}

        {!isLoading && filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">暂无模板</p>
          </div>
        )}
      </div>

      {/* Template Preview Modal */}
      {previewTemplate && showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {previewTemplate.name} - 模板预览
                </h2>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Template Preview */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">模板预览</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <img 
                      src={previewTemplate.preview} 
                      alt={previewTemplate.name}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Template Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">模板详情</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">名称</label>
                      <p className="text-gray-900">{previewTemplate.name}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                      <p className="text-gray-900">{previewTemplate.category}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                      <p className="text-gray-900">{previewTemplate.description}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">支持语言</label>
                      <div className="flex flex-wrap gap-2">
                        {previewTemplate.supportedLanguages.map((lang) => (
                          <span 
                            key={lang}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => {
                        onTemplateSelect(previewTemplate.id)
                        setPreviewTemplate(null)
                      }}
                      className="w-full btn-primary"
                    >
                      选择此模板
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