import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WeCV AI - Intelligent Resume Generation & Management Platform',
  description: 'WeCV AI helps global job seekers efficiently create professional resumes with AI-driven technology, multi-language and multi-template support, online hosting and export.',
  keywords: 'WeCV, AI Resume, Intelligent Resume, Job Search, Resume Templates, Resume Builder',
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