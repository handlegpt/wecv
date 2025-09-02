import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'
import { initializeApp } from '@/lib/init'
import { inter, notoSansSC, notoSansJP, notoSans, preloadFonts, monitorFontPerformance } from '@/lib/fonts'

// 默认metadata（英文）
export const metadata: Metadata = {
  title: 'WeCV AI - Intelligent Resume Generation & Management Platform',
  description: 'WeCV AI helps global job seekers efficiently create professional resumes with AI-driven technology, multi-language and multi-template support, online hosting and export.',
  keywords: 'WeCV, AI Resume, Intelligent Resume, Job Search, Resume Templates, Resume Builder',
  authors: [{ name: 'WeCV AI Team' }],
  creator: 'WeCV AI',
  publisher: 'WeCV AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://wecv.ai'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'zh-CN': '/zh',
      'ja-JP': '/ja',
    },
  },
  openGraph: {
    title: 'WeCV AI - Intelligent Resume Generation & Management Platform',
    description: 'WeCV AI helps global job seekers efficiently create professional resumes with AI-driven technology, multi-language and multi-template support, online hosting and export.',
    url: 'https://wecv.ai',
    siteName: 'WeCV AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WeCV AI - Intelligent Resume Builder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WeCV AI - Intelligent Resume Generation & Management Platform',
    description: 'WeCV AI helps global job seekers efficiently create professional resumes with AI-driven technology, multi-language and multi-template support, online hosting and export.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 在客户端初始化应用和字体
  if (typeof window !== 'undefined') {
    initializeApp().catch(console.error)
    preloadFonts()
    monitorFontPerformance()
  }

  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.variable} ${notoSansSC.variable} ${notoSansJP.variable} ${notoSans.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 