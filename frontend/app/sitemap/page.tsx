import { generateHTMLSitemap } from '@/lib/seo/sitemap'

export default function SitemapPage() {
  const htmlSitemap = generateHTMLSitemap()
  
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlSitemap }} />
  )
}
