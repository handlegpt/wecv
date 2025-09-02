import { NextRequest, NextResponse } from 'next/server'
import { generateXMLSitemap } from '@/lib/seo/sitemap'

export async function GET(request: NextRequest) {
  try {
    const xmlSitemap = generateXMLSitemap()
    
    return new NextResponse(xmlSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}
