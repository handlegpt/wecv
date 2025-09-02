// 结构化数据 (JSON-LD) 工具函数
export interface OrganizationData {
  name: string
  url: string
  logo: string
  description: string
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  contactPoint?: {
    telephone: string
    contactType: string
    email: string
  }
  sameAs?: string[]
}

export interface WebSiteData {
  name: string
  url: string
  description: string
  potentialAction: {
    target: string
    'query-input': string
  }
}

export interface WebPageData {
  name: string
  url: string
  description: string
  breadcrumb?: {
    itemListElement: Array<{
      position: number
      name: string
      item: string
    }>
  }
}

export interface ResumeTemplateData {
  name: string
  description: string
  url: string
  image: string
  category: string
  price?: string
  currency?: string
}

export interface FAQData {
  question: string
  answer: string
}

// 生成组织结构化数据
export function generateOrganizationSchema(data: OrganizationData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    logo: data.logo,
    description: data.description,
    ...(data.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: data.address.streetAddress,
        addressLocality: data.address.addressLocality,
        addressRegion: data.address.addressRegion,
        postalCode: data.address.postalCode,
        addressCountry: data.address.addressCountry,
      },
    }),
    ...(data.contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: data.contactPoint.telephone,
        contactType: data.contactPoint.contactType,
        email: data.contactPoint.email,
      },
    }),
    ...(data.sameAs && { sameAs: data.sameAs }),
  }
}

// 生成网站结构化数据
export function generateWebSiteSchema(data: WebSiteData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
    description: data.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: data.potentialAction.target,
      'query-input': data.potentialAction['query-input'],
    },
  }
}

// 生成网页结构化数据
export function generateWebPageSchema(data: WebPageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.name,
    url: data.url,
    description: data.description,
    ...(data.breadcrumb && {
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: data.breadcrumb.itemListElement,
      },
    }),
  }
}

// 生成简历模板结构化数据
export function generateResumeTemplateSchema(data: ResumeTemplateData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name,
    description: data.description,
    url: data.url,
    image: data.image,
    category: data.category,
    ...(data.price && {
      offers: {
        '@type': 'Offer',
        price: data.price,
        priceCurrency: data.currency || 'USD',
        availability: 'https://schema.org/InStock',
      },
    }),
  }
}

// 生成 FAQ 结构化数据
export function generateFAQSchema(faqs: FAQData[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// 生成面包屑结构化数据
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// 生成本地企业结构化数据
export function generateLocalBusinessSchema(data: {
  name: string
  description: string
  url: string
  telephone: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    latitude: number
    longitude: number
  }
  openingHours: string[]
  priceRange: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    },
    openingHours: data.openingHours,
    priceRange: data.priceRange,
  }
}

// 生成软件应用结构化数据
export function generateSoftwareApplicationSchema(data: {
  name: string
  description: string
  url: string
  applicationCategory: string
  operatingSystem: string
  offers: {
    price: string
    priceCurrency: string
  }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    description: data.description,
    url: data.url,
    applicationCategory: data.applicationCategory,
    operatingSystem: data.operatingSystem,
    offers: {
      '@type': 'Offer',
      price: data.offers.price,
      priceCurrency: data.offers.priceCurrency,
    },
  }
}
