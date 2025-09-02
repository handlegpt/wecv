'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, Grid, List, Star, Eye, Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  getAllTemplateStyles, 
  getTemplateStylesByCategory, 
  getTemplateStylesByDifficulty,
  searchTemplateStyles,
  TemplateStyle 
} from '@/lib/templates/template-config'
import { TemplatePreview } from './template-preview'
import { ResumeExport } from './resume-export'
import { ResumeData } from '@/components/types/resume'

interface TemplateSelectorProps {
  onTemplateSelect: (templateId: string) => void
  selectedTemplate?: string
  className?: string
  resumeData?: ResumeData
}

export function TemplateSelector({ 
  onTemplateSelect, 
  selectedTemplate,
  className = '',
  resumeData
}: TemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'name' | 'difficulty' | 'popularity'>('name')
  const [previewTemplate, setPreviewTemplate] = useState<TemplateStyle | null>(null)
  const [exportTemplate, setExportTemplate] = useState<TemplateStyle | null>(null)

  const allTemplates = useMemo(() => getAllTemplateStyles(), [])
  
  const filteredTemplates = useMemo(() => {
    let templates = allTemplates

    // 按搜索查询过滤
    if (searchQuery) {
      templates = searchTemplateStyles(searchQuery)
    }

    // 按类别过滤
    if (selectedCategory !== 'all') {
      templates = templates.filter(template => template.category === selectedCategory)
    }

    // 按难度过滤
    if (selectedDifficulty !== 'all') {
      templates = templates.filter(template => template.difficulty === selectedDifficulty)
    }

    // 排序
    templates.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'difficulty':
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        case 'popularity':
          // 这里可以根据实际使用数据排序
          return 0
        default:
          return 0
      }
    })

    return templates
  }, [allTemplates, searchQuery, selectedCategory, selectedDifficulty, sortBy])

  const categories = [
    { id: 'all', name: 'All Categories', count: allTemplates.length },
    { id: 'modern', name: 'Modern', count: allTemplates.filter(t => t.category === 'modern').length },
    { id: 'classic', name: 'Classic', count: allTemplates.filter(t => t.category === 'classic').length },
    { id: 'creative', name: 'Creative', count: allTemplates.filter(t => t.category === 'creative').length },
    { id: 'minimal', name: 'Minimal', count: allTemplates.filter(t => t.category === 'minimal').length },
    { id: 'executive', name: 'Executive', count: allTemplates.filter(t => t.category === 'executive').length }
  ]

  const difficulties = [
    { id: 'all', name: 'All Levels', count: allTemplates.length },
    { id: 'beginner', name: 'Beginner', count: allTemplates.filter(t => t.difficulty === 'beginner').length },
    { id: 'intermediate', name: 'Intermediate', count: allTemplates.filter(t => t.difficulty === 'intermediate').length },
    { id: 'advanced', name: 'Advanced', count: allTemplates.filter(t => t.difficulty === 'advanced').length }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'modern':
        return 'bg-blue-100 text-blue-800'
      case 'classic':
        return 'bg-gray-100 text-gray-800'
      case 'creative':
        return 'bg-purple-100 text-purple-800'
      case 'minimal':
        return 'bg-green-100 text-green-800'
      case 'executive':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handlePreview = (template: TemplateStyle) => {
    setPreviewTemplate(template)
  }

  const handleExport = (template: TemplateStyle) => {
    setExportTemplate(template)
  }

  const handleClosePreview = () => {
    setPreviewTemplate(null)
  }

  const handleCloseExport = () => {
    setExportTemplate(null)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 搜索和过滤 */}
      <div className="space-y-4">
        {/* 搜索栏 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 过滤选项 */}
        <div className="flex flex-wrap gap-4">
          {/* 类别过滤 */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Category:</span>
            <div className="flex space-x-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* 难度过滤 */}
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Level:</span>
            <div className="flex space-x-1">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty.id}
                  onClick={() => setSelectedDifficulty(difficulty.id)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedDifficulty === difficulty.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {difficulty.name} ({difficulty.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 排序和视图模式 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="difficulty">Difficulty</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">View:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 模板列表 */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onSelect={() => onTemplateSelect(template.id)}
            onPreview={() => handlePreview(template)}
            onExport={() => handleExport(template)}
            viewMode={viewMode}
          />
        ))}
      </div>

      {/* 无结果提示 */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* 结果统计 */}
      <div className="text-center text-sm text-gray-500">
        Showing {filteredTemplates.length} of {allTemplates.length} templates
      </div>

      {/* 模板预览模态框 */}
      {previewTemplate && resumeData && (
        <TemplatePreview
          template={previewTemplate}
          data={resumeData}
          isOpen={true}
          onClose={handleClosePreview}
          onSelect={onTemplateSelect}
        />
      )}

      {/* 导出模态框 */}
      {exportTemplate && resumeData && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Export Resume: {exportTemplate.name}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCloseExport}
                  className="flex items-center space-x-2"
                >
                  <span>Close</span>
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <ResumeExport
                templateId={exportTemplate.id}
                data={resumeData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface TemplateCardProps {
  template: TemplateStyle
  isSelected: boolean
  onSelect: () => void
  onPreview: () => void
  onExport: () => void
  viewMode: 'grid' | 'list'
}

function TemplateCard({ template, isSelected, onSelect, onPreview, onExport, viewMode }: TemplateCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'modern':
        return 'bg-blue-100 text-blue-800'
      case 'classic':
        return 'bg-gray-100 text-gray-800'
      case 'creative':
        return 'bg-purple-100 text-purple-800'
      case 'minimal':
        return 'bg-green-100 text-green-800'
      case 'executive':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (viewMode === 'list') {
    return (
      <Card className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">
                  {template.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <p className="text-gray-600 text-sm">{template.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={getCategoryColor(template.category)}>
                    {template.category}
                  </Badge>
                  <Badge className={getDifficultyColor(template.difficulty)}>
                    {template.difficulty}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onPreview()
                }}
                className="flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onExport()
                }}
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              <Button
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={onSelect}
              >
                {isSelected ? 'Selected' : 'Select'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`cursor-pointer transition-all hover:shadow-lg ${
      isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{template.name}</CardTitle>
          <Badge className={getDifficultyColor(template.difficulty)}>
            {template.difficulty}
          </Badge>
        </div>
        <Badge className={getCategoryColor(template.category)}>
          {template.category}
        </Badge>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {template.description}
        </p>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
            <div className="flex flex-wrap gap-1">
              {template.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Best for:</h4>
            <div className="flex flex-wrap gap-1">
              {template.bestFor.slice(0, 2).map((target, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded"
                >
                  {target}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onPreview()
              }}
              className="flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onExport()
              }}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
          <Button
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={onSelect}
          >
            {isSelected ? 'Selected' : 'Select'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
