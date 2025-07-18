import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { Templates } from '@/components/Templates'
import { Pricing } from '@/components/Pricing'
import { Testimonials } from '@/components/Testimonials'
import { CTA } from '@/components/CTA'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Templates />
      <Pricing />
      <Testimonials />
      <CTA />
    </main>
  )
} 