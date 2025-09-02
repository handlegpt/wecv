import { NextRequest, NextResponse } from 'next/server'
import { generateRobotsTxt } from '@/lib/seo/sitemap'

export async function GET(request: NextRequest) {
  try {
    const robotsTxt = generateRobotsTxt()
    
    return new NextResponse(robotsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    })
  } catch (error) {
    console.error('Error generating robots.txt:', error)
    return new NextResponse('Error generating robots.txt', { status: 500 })
  }
}
