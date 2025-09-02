// 动态 Meta 标签工具
export interface MetaTagData {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  ogType?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  robots?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

export interface PageMetaConfig {
  default: MetaTagData
  pages: Record<string, MetaTagData>
}

// 默认 Meta 配置
export const defaultMetaConfig: PageMetaConfig = {
  default: {
    title: 'WeCV AI - Intelligent Resume Generation & Management Platform',
    description: 'WeCV AI helps global job seekers efficiently create professional resumes with AI-driven technology, multi-language and multi-template support, online hosting and export.',
    keywords: 'WeCV, AI Resume, Intelligent Resume, Job Search, Resume Templates, Resume Builder',
    canonical: 'https://wecv.ai',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    robots: 'index, follow',
    author: 'WeCV AI Team',
  },
  pages: {
    '/': {
      title: 'WeCV AI - Intelligent Resume Generation & Management Platform',
      description: 'WeCV AI helps global job seekers efficiently create professional resumes with AI-driven technology, multi-language and multi-template support, online hosting and export.',
      keywords: 'WeCV, AI Resume, Intelligent Resume, Job Search, Resume Templates, Resume Builder',
      ogTitle: 'WeCV AI - Intelligent Resume Generation & Management Platform',
      ogDescription: 'WeCV AI helps global job seekers efficiently create professional resumes with AI-driven technology, multi-language and multi-template support, online hosting and export.',
      ogImage: 'https://wecv.ai/og-image.jpg',
      ogUrl: 'https://wecv.ai',
      ogType: 'website',
      twitterTitle: 'WeCV AI - Intelligent Resume Generation & Management Platform',
      twitterDescription: 'WeCV AI helps global job seekers efficiently create professional resumes with AI-driven technology, multi-language and multi-template support, online hosting and export.',
      twitterImage: 'https://wecv.ai/og-image.jpg',
    },
    '/templates': {
      title: 'Resume Templates - WeCV AI',
      description: 'Browse our collection of professional resume templates designed for different industries and career levels. Create stunning resumes with our AI-powered builder.',
      keywords: 'resume templates, professional templates, CV templates, job application templates',
      ogTitle: 'Resume Templates - WeCV AI',
      ogDescription: 'Browse our collection of professional resume templates designed for different industries and career levels.',
      ogImage: 'https://wecv.ai/templates-og.jpg',
      ogType: 'website',
    },
    '/builder': {
      title: 'Resume Builder - WeCV AI',
      description: 'Create professional resumes with our AI-powered builder. Choose from multiple templates, customize content, and export in various formats.',
      keywords: 'resume builder, CV builder, AI resume builder, professional resume maker',
      ogTitle: 'Resume Builder - WeCV AI',
      ogDescription: 'Create professional resumes with our AI-powered builder. Choose from multiple templates and customize content.',
      ogImage: 'https://wecv.ai/builder-og.jpg',
      ogType: 'website',
    },
    '/pricing': {
      title: 'Pricing Plans - WeCV AI',
      description: 'Choose the perfect plan for your resume building needs. Free, Pro, and Enterprise plans available with different features and benefits.',
      keywords: 'resume builder pricing, CV builder cost, WeCV AI pricing, resume service plans',
      ogTitle: 'Pricing Plans - WeCV AI',
      ogDescription: 'Choose the perfect plan for your resume building needs. Free, Pro, and Enterprise plans available.',
      ogImage: 'https://wecv.ai/pricing-og.jpg',
      ogType: 'website',
    },
    '/about': {
      title: 'About WeCV AI - Our Story',
      description: 'Learn about WeCV AI, our mission to help job seekers create professional resumes, and our team of experts.',
      keywords: 'about WeCV AI, company story, mission, team, resume service company',
      ogTitle: 'About WeCV AI - Our Story',
      ogDescription: 'Learn about WeCV AI, our mission to help job seekers create professional resumes, and our team of experts.',
      ogImage: 'https://wecv.ai/about-og.jpg',
      ogType: 'website',
    },
  },
}

// 获取页面 Meta 数据
export function getPageMeta(pathname: string): MetaTagData {
  const pageMeta = defaultMetaConfig.pages[pathname]
  return {
    ...defaultMetaConfig.default,
    ...pageMeta,
  }
}

// 生成 Meta 标签 HTML
export function generateMetaTags(meta: MetaTagData): string {
  const tags = [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${meta.description}" />`,
    ...(meta.keywords ? [`<meta name="keywords" content="${meta.keywords}" />`] : []),
    ...(meta.canonical ? [`<link rel="canonical" href="${meta.canonical}" />`] : []),
    ...(meta.robots ? [`<meta name="robots" content="${meta.robots}" />`] : []),
    ...(meta.author ? [`<meta name="author" content="${meta.author}" />`] : []),
    
    // Open Graph
    `<meta property="og:title" content="${meta.ogTitle || meta.title}" />`,
    `<meta property="og:description" content="${meta.ogDescription || meta.description}" />`,
    `<meta property="og:type" content="${meta.ogType || 'website'}" />`,
    `<meta property="og:url" content="${meta.ogUrl || meta.canonical || 'https://wecv.ai'}" />`,
    ...(meta.ogImage ? [`<meta property="og:image" content="${meta.ogImage}" />`] : []),
    
    // Twitter Card
    `<meta name="twitter:card" content="${meta.twitterCard || 'summary_large_image'}" />`,
    `<meta name="twitter:title" content="${meta.twitterTitle || meta.title}" />`,
    `<meta name="twitter:description" content="${meta.twitterDescription || meta.description}" />`,
    ...(meta.twitterImage ? [`<meta name="twitter:image" content="${meta.twitterImage}" />`] : []),
    
    // 其他 Meta 标签
    ...(meta.publishedTime ? [`<meta property="article:published_time" content="${meta.publishedTime}" />`] : []),
    ...(meta.modifiedTime ? [`<meta property="article:modified_time" content="${meta.modifiedTime}" />`] : []),
    ...(meta.section ? [`<meta property="article:section" content="${meta.section}" />`] : []),
    ...(meta.tags ? meta.tags.map(tag => `<meta property="article:tag" content="${tag}" />`) : []),
  ]

  return tags.join('\n    ')
}

// 动态更新 Meta 标签
export function updateMetaTags(meta: MetaTagData) {
  if (typeof window === 'undefined') return

  // 更新 title
  document.title = meta.title

  // 更新或创建 meta 标签
  const updateMetaTag = (name: string, content: string, property = false) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
    let metaTag = document.querySelector(selector) as HTMLMetaElement
    
    if (!metaTag) {
      metaTag = document.createElement('meta')
      if (property) {
        metaTag.setAttribute('property', name)
      } else {
        metaTag.setAttribute('name', name)
      }
      document.head.appendChild(metaTag)
    }
    
    metaTag.setAttribute('content', content)
  }

  // 更新 description
  updateMetaTag('description', meta.description)
  
  // 更新 keywords
  if (meta.keywords) {
    updateMetaTag('keywords', meta.keywords)
  }

  // 更新 Open Graph 标签
  updateMetaTag('og:title', meta.ogTitle || meta.title, true)
  updateMetaTag('og:description', meta.ogDescription || meta.description, true)
  updateMetaTag('og:type', meta.ogType || 'website', true)
  updateMetaTag('og:url', meta.ogUrl || meta.canonical || 'https://wecv.ai', true)
  
  if (meta.ogImage) {
    updateMetaTag('og:image', meta.ogImage, true)
  }

  // 更新 Twitter Card 标签
  updateMetaTag('twitter:card', meta.twitterCard || 'summary_large_image')
  updateMetaTag('twitter:title', meta.twitterTitle || meta.title)
  updateMetaTag('twitter:description', meta.twitterDescription || meta.description)
  
  if (meta.twitterImage) {
    updateMetaTag('twitter:image', meta.twitterImage)
  }
}
