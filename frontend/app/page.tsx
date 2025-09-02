import { Suspense, lazy } from 'react'
import { Header } from '@/components/Header'
import { LazyLoadSkeleton } from '@/lib/utils/lazyLoad'

// 懒加载组件
const LazyHero = lazy(() => import('@/components/Hero').then(module => ({ default: module.Hero })))
const LazyFeatures = lazy(() => import('@/components/Features').then(module => ({ default: module.Features })))
const LazyTemplates = lazy(() => import('@/components/Templates').then(module => ({ default: module.Templates })))
const LazyPricing = lazy(() => import('@/components/Pricing').then(module => ({ default: module.Pricing })))
const LazyTestimonials = lazy(() => import('@/components/Testimonials').then(module => ({ default: module.Testimonials })))
const LazyCTA = lazy(() => import('@/components/CTA').then(module => ({ default: module.CTA })))
const LazyFooter = lazy(() => import('@/components/Footer').then(module => ({ default: module.Footer })))

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section - 首屏关键内容，不懒加载 */}
      <Suspense fallback={<LazyLoadSkeleton />}>
        <LazyHero />
      </Suspense>
      
      {/* Features Section */}
      <Suspense fallback={<LazyLoadSkeleton />}>
        <LazyFeatures />
      </Suspense>
      
      {/* Templates Section */}
      <Suspense fallback={<LazyLoadSkeleton />}>
        <LazyTemplates />
      </Suspense>
      
      {/* Pricing Section */}
      <Suspense fallback={<LazyLoadSkeleton />}>
        <LazyPricing />
      </Suspense>
      
      {/* Testimonials Section */}
      <Suspense fallback={<LazyLoadSkeleton />}>
        <LazyTestimonials />
      </Suspense>
      
      {/* CTA Section */}
      <Suspense fallback={<LazyLoadSkeleton />}>
        <LazyCTA />
      </Suspense>
      
      {/* Footer */}
      <Suspense fallback={<LazyLoadSkeleton />}>
        <LazyFooter />
      </Suspense>
    </main>
  )
} 