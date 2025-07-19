'use client'

import { useTranslation } from 'react-i18next'
import { Calendar, Clock, User, ArrowRight, BookOpen, TrendingUp, Lightbulb } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
}

export default function BlogPage() {
  const { t } = useTranslation()

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: t('blog.post1.title', '10 Essential Tips for Writing a Standout Resume'),
      excerpt: t('blog.post1.excerpt', 'Learn the key strategies that hiring managers look for in resumes and how to make yours stand out from the competition.'),
      category: t('blog.categories.resume', 'Resume Writing'),
      author: 'Sarah Johnson',
      date: '2024-01-15',
      readTime: '5 min read',
      image: '/blog/resume-tips.jpg'
    },
    {
      id: '2',
      title: t('blog.post2.title', 'How to Tailor Your Resume for Different Industries'),
      excerpt: t('blog.post2.excerpt', 'Discover how to customize your resume for different job sectors and increase your chances of getting hired.'),
      category: t('blog.categories.career', 'Career Advice'),
      author: 'Michael Chen',
      date: '2024-01-12',
      readTime: '7 min read',
      image: '/blog/industry-tailoring.jpg'
    },
    {
      id: '3',
      title: t('blog.post3.title', 'The Future of Job Applications: AI and Automation'),
      excerpt: t('blog.post3.excerpt', 'Explore how artificial intelligence is changing the job application process and what it means for job seekers.'),
      category: t('blog.categories.trends', 'Industry Trends'),
      author: 'Emily Rodriguez',
      date: '2024-01-10',
      readTime: '6 min read',
      image: '/blog/ai-trends.jpg'
    },
    {
      id: '4',
      title: t('blog.post4.title', 'ATS Optimization: Making Your Resume Machine-Readable'),
      excerpt: t('blog.post4.excerpt', 'Master the art of creating resumes that pass through Applicant Tracking Systems and reach human recruiters.'),
      category: t('blog.categories.resume', 'Resume Writing'),
      author: 'David Kim',
      date: '2024-01-08',
      readTime: '8 min read',
      image: '/blog/ats-optimization.jpg'
    },
    {
      id: '5',
      title: t('blog.post5.title', 'Remote Work Resume: What Employers Look For'),
      excerpt: t('blog.post5.excerpt', 'Learn how to highlight remote work skills and experience in your resume for the growing remote job market.'),
      category: t('blog.categories.career', 'Career Advice'),
      author: 'Lisa Wang',
      date: '2024-01-05',
      readTime: '4 min read',
      image: '/blog/remote-work.jpg'
    },
    {
      id: '6',
      title: t('blog.post6.title', 'Entry-Level Resume Guide: Landing Your First Job'),
      excerpt: t('blog.post6.excerpt', 'A comprehensive guide for recent graduates and career changers on creating an effective entry-level resume.'),
      category: t('blog.categories.resume', 'Resume Writing'),
      author: 'James Thompson',
      date: '2024-01-03',
      readTime: '9 min read',
      image: '/blog/entry-level.jpg'
    }
  ]

  const categories = [
    { name: t('blog.categories.all', 'All Posts'), count: blogPosts.length },
    { name: t('blog.categories.resume', 'Resume Writing'), count: 3 },
    { name: t('blog.categories.career', 'Career Advice'), count: 2 },
    { name: t('blog.categories.trends', 'Industry Trends'), count: 1 }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('blog.title', 'Career Resources & Blog')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('blog.subtitle', 'Expert insights, tips, and trends to help you advance your career and create compelling resumes.')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Featured Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 mr-2" />
              <span className="text-blue-100 font-medium">{t('blog.featured', 'Featured Article')}</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">{blogPosts[0].title}</h2>
            <p className="text-blue-100 mb-6 max-w-2xl">{blogPosts[0].excerpt}</p>
            <div className="flex items-center text-blue-100 text-sm mb-4">
              <User className="w-4 h-4 mr-2" />
              <span>{blogPosts[0].author}</span>
              <span className="mx-2">•</span>
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(blogPosts[0].date)}</span>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4 mr-2" />
              <span>{blogPosts[0].readTime}</span>
            </div>
            <a href={`/blog/${blogPosts[0].id}`} className="inline-flex items-center text-white font-medium hover:text-blue-100 transition-colors">
              {t('blog.readMore', 'Read More')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                    <a href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                      {t('blog.readMore', 'Read More')}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t('blog.newsletter.title', 'Stay Updated with Career Tips')}
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {t('blog.newsletter.subtitle', 'Get the latest resume writing tips, career advice, and industry insights delivered to your inbox.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('blog.newsletter.placeholder', 'Enter your email')}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="btn-primary px-6 py-3">
              {t('blog.newsletter.subscribe', 'Subscribe')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 