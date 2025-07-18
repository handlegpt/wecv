'use client'

import Link from 'next/link'

const templates = [
  {
    id: 'modern',
    name: '现代简约',
    description: '简洁大方的现代风格，适合技术岗位',
    image: '/templates/modern.jpg',
    category: '技术'
  },
  {
    id: 'classic',
    name: '经典商务',
    description: '传统商务风格，适合管理岗位',
    image: '/templates/classic.jpg',
    category: '商务'
  },
  {
    id: 'creative',
    name: '创意设计',
    description: '富有创意的设计风格，适合创意岗位',
    image: '/templates/creative.jpg',
    category: '创意'
  },
  {
    id: 'minimal',
    name: '极简主义',
    description: '极简设计，突出内容本身',
    image: '/templates/minimal.jpg',
    category: '通用'
  }
]

export function Templates() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            精选简历模板
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            多种专业模板供您选择，总有一款适合您
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template) => (
            <div 
              key={template.id}
              className="card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-gray-500 text-sm">
                  {template.name} 模板预览
                </div>
              </div>
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
              <Link 
                href={`/builder?template=${template.id}`}
                className="btn-primary w-full text-center"
              >
                使用此模板
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/templates"
            className="btn-secondary text-lg px-8 py-3"
          >
            查看更多模板
          </Link>
        </div>
      </div>
    </section>
  )
} 