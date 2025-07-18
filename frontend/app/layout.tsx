import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WeCV AI - 智能AI简历生成与管理平台',
  description: 'WeCV AI，助力全球求职者高效打造专业简历，AI驱动，多语言多模板支持，在线托管与导出。',
  keywords: 'WeCV, AI简历, 智能简历, 求职, 简历模板, 简历制作',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 