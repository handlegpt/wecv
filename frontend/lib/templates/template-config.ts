// 简历模板配置系统
export interface TemplateStyle {
  id: string
  name: string
  category: 'modern' | 'classic' | 'creative' | 'minimal' | 'executive'
  description: string
  preview: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    muted: string
  }
  fonts: {
    heading: string
    body: string
    accent: string
    muted: string
  }
  spacing: {
    section: string
    item: string
    text: string
  }
  layout: 'single' | 'two-column' | 'modern' | 'creative' | 'minimal'
  features: string[]
  bestFor: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface TemplateSection {
  id: string
  name: string
  required: boolean
  order: number
  maxItems?: number
  showInPreview: boolean
}

// 模板样式配置
export const templateStyles: TemplateStyle[] = [
  {
    id: 'modern',
    name: 'Modern',
    category: 'modern',
    description: 'Clean and contemporary design with subtle shadows and modern typography',
    preview: '/templates/modern-preview.jpg',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937',
      muted: '#6b7280'
    },
    fonts: {
      heading: 'font-bold text-gray-900',
      body: 'font-normal text-gray-700',
      accent: 'font-medium text-blue-600',
      muted: 'text-gray-500'
    },
    spacing: {
      section: 'mb-8',
      item: 'mb-4',
      text: 'mb-2'
    },
    layout: 'modern',
    features: ['Responsive design', 'Modern typography', 'Subtle shadows', 'Clean spacing'],
    bestFor: ['Tech professionals', 'Creative roles', 'Modern companies'],
    difficulty: 'beginner'
  },
  {
    id: 'classic',
    name: 'Classic',
    category: 'classic',
    description: 'Traditional and professional design suitable for all industries',
    preview: '/templates/classic-preview.jpg',
    colors: {
      primary: '#374151',
      secondary: '#6b7280',
      accent: '#1f2937',
      background: '#ffffff',
      text: '#111827',
      muted: '#9ca3af'
    },
    fonts: {
      heading: 'font-bold text-gray-900',
      body: 'font-normal text-gray-800',
      accent: 'font-semibold text-gray-700',
      muted: 'text-gray-500'
    },
    spacing: {
      section: 'mb-6',
      item: 'mb-3',
      text: 'mb-1'
    },
    layout: 'single',
    features: ['Professional appearance', 'Traditional layout', 'Easy to read', 'Industry standard'],
    bestFor: ['Corporate roles', 'Traditional industries', 'Government positions'],
    difficulty: 'beginner'
  },
  {
    id: 'creative',
    name: 'Creative',
    category: 'creative',
    description: 'Bold and artistic design for creative professionals',
    preview: '/templates/creative-preview.jpg',
    colors: {
      primary: '#7c3aed',
      secondary: '#f59e0b',
      accent: '#ec4899',
      background: '#fafafa',
      text: '#1f2937',
      muted: '#8b5cf6'
    },
    fonts: {
      heading: 'font-bold text-purple-900',
      body: 'font-normal text-gray-800',
      accent: 'font-semibold text-purple-600',
      muted: 'text-purple-600'
    },
    spacing: {
      section: 'mb-8',
      item: 'mb-5',
      text: 'mb-3'
    },
    layout: 'creative',
    features: ['Bold colors', 'Creative layout', 'Visual hierarchy', 'Unique design'],
    bestFor: ['Designers', 'Artists', 'Creative directors', 'Marketing professionals'],
    difficulty: 'intermediate'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'minimal',
    description: 'Simple and clean design focusing on content',
    preview: '/templates/minimal-preview.jpg',
    colors: {
      primary: '#000000',
      secondary: '#6b7280',
      accent: '#374151',
      background: '#ffffff',
      text: '#111827',
      muted: '#9ca3af'
    },
    fonts: {
      heading: 'font-light text-black',
      body: 'font-normal text-gray-800',
      accent: 'font-medium text-gray-600',
      muted: 'text-gray-500'
    },
    spacing: {
      section: 'mb-10',
      item: 'mb-6',
      text: 'mb-3'
    },
    layout: 'minimal',
    features: ['Minimal design', 'Focus on content', 'Clean typography', 'Generous spacing'],
    bestFor: ['Content creators', 'Writers', 'Minimalist professionals'],
    difficulty: 'beginner'
  },
  {
    id: 'executive',
    name: 'Executive',
    category: 'executive',
    description: 'Sophisticated design for senior professionals and executives',
    preview: '/templates/executive-preview.jpg',
    colors: {
      primary: '#1f2937',
      secondary: '#374151',
      accent: '#d97706',
      background: '#ffffff',
      text: '#111827',
      muted: '#6b7280'
    },
    fonts: {
      heading: 'font-bold text-gray-900',
      body: 'font-normal text-gray-800',
      accent: 'font-semibold text-amber-600',
      muted: 'text-gray-500'
    },
    spacing: {
      section: 'mb-8',
      item: 'mb-4',
      text: 'mb-2'
    },
    layout: 'two-column',
    features: ['Professional appearance', 'Two-column layout', 'Executive styling', 'Premium look'],
    bestFor: ['Executives', 'Senior managers', 'C-level positions', 'Consultants'],
    difficulty: 'intermediate'
  },
  {
    id: 'impact',
    name: 'Impact',
    category: 'modern',
    description: 'Results-focused design emphasizing achievements and metrics',
    preview: '/templates/impact-preview.jpg',
    colors: {
      primary: '#059669',
      secondary: '#0d9488',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#064e3b',
      muted: '#6b7280'
    },
    fonts: {
      heading: 'font-bold text-green-900',
      body: 'font-normal text-green-800',
      accent: 'font-semibold text-amber-600',
      muted: 'text-green-600'
    },
    spacing: {
      section: 'mb-6',
      item: 'mb-4',
      text: 'mb-2'
    },
    layout: 'modern',
    features: ['Achievement focus', 'Metrics display', 'Impact visualization', 'Results-oriented'],
    bestFor: ['Sales professionals', 'Project managers', 'Performance-driven roles'],
    difficulty: 'intermediate'
  },
  {
    id: 'clean',
    name: 'Clean',
    category: 'classic',
    description: 'Simple and organized design with clear structure',
    preview: '/templates/clean-preview.jpg',
    colors: {
      primary: '#374151',
      secondary: '#6b7280',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#111827',
      muted: '#9ca3af'
    },
    fonts: {
      heading: 'font-semibold text-gray-900',
      body: 'font-normal text-gray-700',
      accent: 'font-medium text-blue-600',
      muted: 'text-gray-500'
    },
    spacing: {
      section: 'mb-6',
      item: 'mb-3',
      text: 'mb-1'
    },
    layout: 'single',
    features: ['Clear structure', 'Easy scanning', 'Professional look', 'Good readability'],
    bestFor: ['Administrative roles', 'Customer service', 'Entry-level positions'],
    difficulty: 'beginner'
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    category: 'modern',
    description: 'Current design trends with modern aesthetics',
    preview: '/templates/contemporary-preview.jpg',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937',
      muted: '#6b7280'
    },
    fonts: {
      heading: 'font-bold text-indigo-900',
      body: 'font-normal text-gray-800',
      accent: 'font-semibold text-indigo-600',
      muted: 'text-indigo-600'
    },
    spacing: {
      section: 'mb-8',
      item: 'mb-5',
      text: 'mb-3'
    },
    layout: 'modern',
    features: ['Modern aesthetics', 'Trendy design', 'Visual appeal', 'Contemporary look'],
    bestFor: ['Young professionals', 'Startup employees', 'Modern companies'],
    difficulty: 'intermediate'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    category: 'executive',
    description: 'Sophisticated and refined design for premium positions',
    preview: '/templates/elegant-preview.jpg',
    colors: {
      primary: '#1f2937',
      secondary: '#4b5563',
      accent: '#d97706',
      background: '#ffffff',
      text: '#111827',
      muted: '#6b7280'
    },
    fonts: {
      heading: 'font-light text-gray-900',
      body: 'font-normal text-gray-800',
      accent: 'font-medium text-amber-600',
      muted: 'text-gray-500'
    },
    spacing: {
      section: 'mb-10',
      item: 'mb-6',
      text: 'mb-3'
    },
    layout: 'two-column',
    features: ['Premium design', 'Elegant typography', 'Sophisticated layout', 'Luxury feel'],
    bestFor: ['Luxury brands', 'Premium positions', 'High-end consulting', 'Executive roles'],
    difficulty: 'advanced'
  },
  {
    id: 'simple',
    name: 'Simple',
    category: 'minimal',
    description: 'Basic and straightforward design for maximum readability',
    preview: '/templates/simple-preview.jpg',
    colors: {
      primary: '#000000',
      secondary: '#4b5563',
      accent: '#6b7280',
      background: '#ffffff',
      text: '#000000',
      muted: '#6b7280'
    },
    fonts: {
      heading: 'font-bold text-black',
      body: 'font-normal text-black',
      accent: 'font-medium text-gray-600',
      muted: 'text-gray-500'
    },
    spacing: {
      section: 'mb-8',
      item: 'mb-4',
      text: 'mb-2'
    },
    layout: 'single',
    features: ['Maximum readability', 'Simple design', 'Easy scanning', 'Universal appeal'],
    bestFor: ['All professionals', 'International applications', 'Simple preferences'],
    difficulty: 'beginner'
  }
]

// 模板部分配置
export const templateSections: TemplateSection[] = [
  {
    id: 'personal',
    name: 'Personal Information',
    required: true,
    order: 1,
    showInPreview: true
  },
  {
    id: 'summary',
    name: 'Professional Summary',
    required: false,
    order: 2,
    showInPreview: true
  },
  {
    id: 'experience',
    name: 'Work Experience',
    required: true,
    order: 3,
    maxItems: 5,
    showInPreview: true
  },
  {
    id: 'education',
    name: 'Education',
    required: false,
    order: 4,
    maxItems: 3,
    showInPreview: true
  },
  {
    id: 'skills',
    name: 'Skills',
    required: false,
    order: 5,
    showInPreview: true
  },
  {
    id: 'projects',
    name: 'Projects',
    required: false,
    order: 6,
    maxItems: 4,
    showInPreview: false
  },
  {
    id: 'certifications',
    name: 'Certifications',
    required: false,
    order: 7,
    maxItems: 5,
    showInPreview: false
  },
  {
    id: 'languages',
    name: 'Languages',
    required: false,
    order: 8,
    maxItems: 4,
    showInPreview: false
  }
]

// 获取模板样式
export function getTemplateStyle(templateId: string): TemplateStyle | undefined {
  return templateStyles.find(style => style.id === templateId)
}

// 获取所有模板样式
export function getAllTemplateStyles(): TemplateStyle[] {
  return templateStyles
}

// 按类别获取模板样式
export function getTemplateStylesByCategory(category: TemplateStyle['category']): TemplateStyle[] {
  return templateStyles.filter(style => style.category === category)
}

// 按难度获取模板样式
export function getTemplateStylesByDifficulty(difficulty: TemplateStyle['difficulty']): TemplateStyle[] {
  return templateStyles.filter(style => style.difficulty === difficulty)
}

// 搜索模板样式
export function searchTemplateStyles(query: string): TemplateStyle[] {
  const lowercaseQuery = query.toLowerCase()
  return templateStyles.filter(style => 
    style.name.toLowerCase().includes(lowercaseQuery) ||
    style.description.toLowerCase().includes(lowercaseQuery) ||
    style.features.some(feature => feature.toLowerCase().includes(lowercaseQuery)) ||
    style.bestFor.some(target => target.toLowerCase().includes(lowercaseQuery))
  )
}
