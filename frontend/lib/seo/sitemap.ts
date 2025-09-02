// Sitemap 生成器
export interface SitemapUrl {
  url: string
  lastModified?: Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  image?: {
    url: string
    title?: string
    caption?: string
  }
}

export interface SitemapConfig {
  baseUrl: string
  urls: SitemapUrl[]
  excludePatterns?: string[]
  includePatterns?: string[]
}

// 默认 Sitemap 配置
export const defaultSitemapConfig: SitemapConfig = {
  baseUrl: 'https://wecv.ai',
  urls: [
    {
      url: '/',
      changeFrequency: 'daily',
      priority: 1.0,
      image: {
        url: 'https://wecv.ai/og-image.jpg',
        title: 'WeCV AI - Intelligent Resume Builder',
        caption: 'Professional resume generation platform',
      },
    },
    {
      url: '/templates',
      changeFrequency: 'weekly',
      priority: 0.9,
      image: {
        url: 'https://wecv.ai/templates-og.jpg',
        title: 'Resume Templates',
        caption: 'Professional resume templates',
      },
    },
    {
      url: '/builder',
      changeFrequency: 'weekly',
      priority: 0.9,
      image: {
        url: 'https://wecv.ai/builder-og.jpg',
        title: 'Resume Builder',
        caption: 'AI-powered resume builder',
      },
    },
    {
      url: '/pricing',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: '/about',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: '/help',
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: '/privacy',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: '/auth/login',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: '/auth/register',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ],
  excludePatterns: [
    '/admin/*',
    '/api/*',
    '/_next/*',
    '/static/*',
    '*.json',
    '*.xml',
  ],
  includePatterns: [
    '/*.html',
    '/*.htm',
    '/*.php',
  ],
}

// 生成 XML Sitemap
export function generateXMLSitemap(config: SitemapConfig = defaultSitemapConfig): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>'
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">'
  const urlsetClose = '</urlset>'

  const urlEntries = config.urls.map(url => {
    const urlElement = [
      '  <url>',
      `    <loc>${config.baseUrl}${url.url}</loc>`,
      ...(url.lastModified ? [`    <lastmod>${url.lastModified.toISOString()}</lastmod>`] : []),
      ...(url.changeFrequency ? [`    <changefreq>${url.changeFrequency}</changefreq>`] : []),
      ...(url.priority ? [`    <priority>${url.priority}</priority>`] : []),
      ...(url.image ? [
        '    <image:image>',
        `      <image:loc>${url.image.url}</image:loc>`,
        ...(url.image.title ? [`      <image:title>${url.image.title}</image:title>`] : []),
        ...(url.image.caption ? [`      <image:caption>${url.image.caption}</image:caption>`] : []),
        '    </image:image>',
      ] : []),
      '  </url>',
    ].join('\n')

    return urlElement
  }).join('\n')

  return `${xmlHeader}\n${urlsetOpen}\n${urlEntries}\n${urlsetClose}`
}

// 生成 HTML Sitemap
export function generateHTMLSitemap(config: SitemapConfig = defaultSitemapConfig): string {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sitemap - WeCV AI</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .sitemap { max-width: 800px; margin: 0 auto; }
        .url-group { margin-bottom: 30px; }
        .url-group h2 { color: #333; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
        .url-item { margin: 10px 0; padding: 10px; background: #f8f9fa; border-radius: 5px; }
        .url-item a { color: #2563eb; text-decoration: none; font-weight: bold; }
        .url-item a:hover { text-decoration: underline; }
        .url-meta { font-size: 12px; color: #666; margin-top: 5px; }
        .priority-high { border-left: 4px solid #10b981; }
        .priority-medium { border-left: 4px solid #f59e0b; }
        .priority-low { border-left: 4px solid #ef4444; }
    </style>
</head>
<body>
    <div class="sitemap">
        <h1>Sitemap - WeCV AI</h1>
        <p>Complete list of all pages on our website.</p>
        
        <div class="url-group">
            <h2>Main Pages</h2>
            ${config.urls
              .filter(url => url.priority && url.priority >= 0.8)
              .map(url => `
                <div class="url-item priority-high">
                    <a href="${config.baseUrl}${url.url}">${url.url === '/' ? 'Home' : url.url.slice(1).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</a>
                    <div class="url-meta">
                        Priority: ${url.priority} | 
                        Change Frequency: ${url.changeFrequency || 'N/A'}
                    </div>
                </div>
              `).join('')}
        </div>
        
        <div class="url-group">
            <h2>Secondary Pages</h2>
            ${config.urls
              .filter(url => url.priority && url.priority >= 0.5 && url.priority < 0.8)
              .map(url => `
                <div class="url-item priority-medium">
                    <a href="${config.baseUrl}${url.url}">${url.url === '/' ? 'Home' : url.url.slice(1).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</a>
                    <div class="url-meta">
                        Priority: ${url.priority} | 
                        Change Frequency: ${url.changeFrequency || 'N/A'}
                    </div>
                </div>
              `).join('')}
        </div>
        
        <div class="url-group">
            <h2>Other Pages</h2>
            ${config.urls
              .filter(url => !url.priority || url.priority < 0.5)
              .map(url => `
                <div class="url-item priority-low">
                    <a href="${config.baseUrl}${url.url}">${url.url === '/' ? 'Home' : url.url.slice(1).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</a>
                    <div class="url-meta">
                        Priority: ${url.priority || 'N/A'} | 
                        Change Frequency: ${url.changeFrequency || 'N/A'}
                    </div>
                </div>
              `).join('')}
        </div>
        
        <div style="margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 5px;">
            <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Total Pages:</strong> ${config.urls.length}</p>
            <p><a href="/sitemap.xml">XML Sitemap</a> | <a href="/">Back to Home</a></p>
        </div>
    </div>
</body>
</html>`

  return html
}

// 生成 Robots.txt
export function generateRobotsTxt(config: SitemapConfig = defaultSitemapConfig): string {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${config.baseUrl}/sitemap.xml

# Disallow admin and API routes
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow important pages
Allow: /
Allow: /templates
Allow: /builder
Allow: /pricing
Allow: /about
Allow: /help

# Crawl delay (optional)
Crawl-delay: 1`
}

// 验证 URL 是否应该包含在 Sitemap 中
export function shouldIncludeUrl(url: string, config: SitemapConfig = defaultSitemapConfig): boolean {
  // 检查排除模式
  if (config.excludePatterns) {
    for (const pattern of config.excludePatterns) {
      if (pattern.includes('*')) {
        const regex = new RegExp(pattern.replace(/\*/g, '.*'))
        if (regex.test(url)) {
          return false
        }
      } else if (url.startsWith(pattern)) {
        return false
      }
    }
  }

  // 检查包含模式
  if (config.includePatterns) {
    for (const pattern of config.includePatterns) {
      if (pattern.includes('*')) {
        const regex = new RegExp(pattern.replace(/\*/g, '.*'))
        if (regex.test(url)) {
          return true
        }
      } else if (url.startsWith(pattern)) {
        return true
      }
    }
  }

  return true
}

// 添加新 URL 到 Sitemap
export function addUrlToSitemap(url: SitemapUrl, config: SitemapConfig = defaultSitemapConfig): SitemapConfig {
  const existingUrl = config.urls.find(u => u.url === url.url)
  if (existingUrl) {
    // 更新现有 URL
    Object.assign(existingUrl, url)
  } else {
    // 添加新 URL
    config.urls.push(url)
  }
  return config
}

// 从 Sitemap 中移除 URL
export function removeUrlFromSitemap(url: string, config: SitemapConfig = defaultSitemapConfig): SitemapConfig {
  config.urls = config.urls.filter(u => u.url !== url)
  return config
}
