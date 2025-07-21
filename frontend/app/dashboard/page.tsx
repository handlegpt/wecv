'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

interface Resume {
  id: string
  title: string
  createdAt: string
  updatedAt: string
}

interface User {
  id: string
  name: string
  email: string
}

export default function DashboardPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/auth/login')
      return
    }

    setUser(JSON.parse(userData))
    fetchResumes(token)
  }, [router])

  const fetchResumes = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setResumes(data)
      } else {
        toast.error(t('messages.fetchResumesFailed', '获取简历列表失败'))
      }
    } catch (error) {
      toast.error(t('messages.networkError', '网络错误'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
    toast.success(t('messages.logoutSuccess', '已退出登录'))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('messages.loading', '加载中...')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">WeCV AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{t('dashboard.welcome', '欢迎')}，{user?.name}</span>
              <button
                onClick={handleLogout}
                className="btn-secondary"
              >
                {t('nav.logout', '退出登录')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{t('dashboard.myResumes', '我的简历')}</h2>
            <Link
              href="/builder"
              className="btn-primary"
            >
              {t('dashboard.createNewResume', '创建新简历')}
            </Link>
          </div>

          {resumes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('dashboard.noResumes', '还没有简历')}</h3>
              <p className="text-gray-600 mb-6">{t('dashboard.startCreating', '开始创建您的第一份专业简历吧！')}</p>
              <Link
                href="/builder"
                className="btn-primary"
              >
                {t('dashboard.createResume', '创建简历')}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <div key={resume.id} className="card hover:shadow-lg transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{resume.title}</h3>
                    <div className="flex space-x-2">
                      <Link
                        href={`/builder/${resume.id}`}
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        {t('dashboard.edit', '编辑')}
                      </Link>
                      <button className="text-red-600 hover:text-red-700 text-sm">
                        {t('dashboard.delete', '删除')}
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>{t('dashboard.createdAt', '创建时间')}：{new Date(resume.createdAt).toLocaleDateString()}</p>
                    <p>{t('dashboard.updatedAt', '更新时间')}：{new Date(resume.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 