'use client'

import { useEffect } from 'react'

interface StructuredDataProps {
  data: Record<string, any>
  type?: 'application/ld+json' | 'application/json'
}

export function StructuredData({ data, type = 'application/ld+json' }: StructuredDataProps) {
  useEffect(() => {
    // 创建 script 标签
    const script = document.createElement('script')
    script.type = type
    script.text = JSON.stringify(data)
    
    // 添加到 head
    document.head.appendChild(script)
    
    // 清理函数
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [data, type])

  return null
}

// 预定义的结构化数据组件
export function OrganizationSchema({ data }: { data: any }) {
  return <StructuredData data={data} />
}

export function WebSiteSchema({ data }: { data: any }) {
  return <StructuredData data={data} />
}

export function WebPageSchema({ data }: { data: any }) {
  return <StructuredData data={data} />
}

export function ResumeTemplateSchema({ data }: { data: any }) {
  return <StructuredData data={data} />
}

export function FAQSchema({ data }: { data: any }) {
  return <StructuredData data={data} />
}

export function BreadcrumbSchema({ data }: { data: any }) {
  return <StructuredData data={data} />
}

// 组合结构化数据组件
export function CombinedStructuredData({ schemas }: { schemas: Record<string, any>[] }) {
  return (
    <>
      {schemas.map((schema, index) => (
        <StructuredData key={index} data={schema} />
      ))}
    </>
  )
}
