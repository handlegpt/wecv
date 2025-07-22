'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Header } from '@/components/Header'
import { Sparkles } from 'lucide-react'

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
  plan: string
  planExpiresAt?: string
  maxResumes: number
  canUseAI: boolean
  canExport: boolean
  canShare: boolean
  canAnalytics: boolean
  canTemplates: boolean
  canMultiLanguage: boolean
}

interface UserStats {
  totalResumes: number
  resumesThisMonth: number
  lastActive: string
  planUsage: number
}

export default function DashboardPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
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
    fetchUserData(token)
  }, [router])

  const fetchUserData = async (token: string) => {
    try {
      // Fetch resumes
      const resumesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (resumesResponse.ok) {
        const resumesData = await resumesResponse.json()
        setResumes(resumesData)
        // Fetch user plan并统计数量
        const planResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/plan`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (planResponse.ok) {
          const planData = await planResponse.json()
          setUserStats({
            totalResumes: resumesData.length,
            resumesThisMonth: Math.floor(Math.random() * 5) + 1, // Mock data
            lastActive: new Date().toISOString(),
            planUsage: Math.floor((resumesData.length / planData.maxResumes) * 100)
          })
        }
      }

      // Fetch user profile and plan
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (userResponse.ok) {
        const userData = await userResponse.json()
        setUser(userData)
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

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('dashboard.deleteConfirm', '确定要删除这份简历吗？'))) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resume/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setResumes(resumes.filter(r => r.id !== id));
        toast.success(t('dashboard.deleteSuccess', '删除成功！'));
      } else {
        toast.error(t('dashboard.deleteFailed', '删除失败'));
      }
    } catch {
      toast.error(t('messages.networkError', '网络错误'));
    }
  };

  const getPlanStatus = () => {
    if (!user) return { status: 'free', color: 'bg-gray-100 text-gray-800' }
    
    if (user.plan === 'pro') {
      return { status: 'pro', color: 'bg-blue-100 text-blue-800' }
    } else if (user.plan === 'enterprise') {
      return { status: 'enterprise', color: 'bg-purple-100 text-purple-800' }
    } else {
      return { status: 'free', color: 'bg-gray-100 text-gray-800' }
    }
  }

  const getFeatureStatus = (feature: boolean) => {
    return feature ? 
      { icon: '✓', color: 'text-green-600' } : 
      { icon: '✗', color: 'text-red-600' }
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

  const planStatus = getPlanStatus()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header variant="dashboard" user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: t('dashboard.overview', '概览') },
                { id: 'resumes', label: t('dashboard.myResumes', '我的简历') },
                { id: 'plan', label: t('dashboard.plan', '计划') },
                { id: 'settings', label: t('dashboard.settings', '设置') }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="card">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">{t('dashboard.totalResumes', '总简历数')}</p>
                      <p className="text-2xl font-semibold text-gray-900">{userStats?.totalResumes || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">{t('dashboard.thisMonth', '本月创建')}</p>
                      <p className="text-2xl font-semibold text-gray-900">{userStats?.resumesThisMonth || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">{t('dashboard.planUsage', '计划使用')}</p>
                      <p className="text-2xl font-semibold text-gray-900">{userStats?.planUsage || 0}%</p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">{t('dashboard.lastActive', '最后活跃')}</p>
                      <p className="text-sm font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('dashboard.quickActions', '快速操作')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link
                    href="/builder"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="h-6 w-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">{t('dashboard.createResume', '创建简历')}</p>
                      <p className="text-sm text-gray-500">{t('dashboard.createResumeDesc', '开始创建新的专业简历')}</p>
                    </div>
                  </Link>

                  <Link
                    href="/templates"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="h-6 w-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">{t('dashboard.browseTemplates', '浏览模板')}</p>
                      <p className="text-sm text-gray-500">{t('dashboard.browseTemplatesDesc', '探索专业简历模板')}</p>
                    </div>
                  </Link>

                  <Link
                    href="/help"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="h-6 w-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">{t('dashboard.getHelp', '获取帮助')}</p>
                      <p className="text-sm text-gray-500">{t('dashboard.getHelpDesc', '查看使用指南和常见问题')}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Resumes Tab */}
          {activeTab === 'resumes' && (
            <div>
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
                          <button
                            className="text-red-600 hover:text-red-700 text-sm"
                            onClick={() => handleDelete(resume.id)}
                          >
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
          )}

          {/* Plan Tab */}
          {activeTab === 'plan' && (
            <div className="space-y-6">
              {/* Current Plan */}
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('dashboard.currentPlan', '当前计划')}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {(user?.plan ? user.plan.toUpperCase() : '')} {t('dashboard.plan', '计划')}
                    </p>
                    <p className="text-gray-600">{t('dashboard.maxResumes', '最多简历数')}: {user?.maxResumes}</p>
                    {user?.planExpiresAt && (
                      <p className="text-gray-600">{t('dashboard.expiresAt', '到期时间')}: {new Date(user.planExpiresAt).toLocaleDateString()}</p>
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${planStatus.color}`}>
                    {planStatus.status ? planStatus.status.toUpperCase() : ''}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('dashboard.features', '功能权限')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{t('dashboard.aiFeatures', 'AI功能')}</span>
                    <span className={`font-medium ${getFeatureStatus(user?.canUseAI || false).color}`}>
                      {getFeatureStatus(user?.canUseAI || false).icon}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{t('dashboard.export', '导出功能')}</span>
                    <span className={`font-medium ${getFeatureStatus(user?.canExport || false).color}`}>
                      {getFeatureStatus(user?.canExport || false).icon}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{t('dashboard.share', '分享功能')}</span>
                    <span className={`font-medium ${getFeatureStatus(user?.canShare || false).color}`}>
                      {getFeatureStatus(user?.canShare || false).icon}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{t('dashboard.analytics', '分析功能')}</span>
                    <span className={`font-medium ${getFeatureStatus(user?.canAnalytics || false).color}`}>
                      {getFeatureStatus(user?.canAnalytics || false).icon}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{t('dashboard.templates', '模板功能')}</span>
                    <span className={`font-medium ${getFeatureStatus(user?.canTemplates || false).color}`}>
                      {getFeatureStatus(user?.canTemplates || false).icon}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{t('dashboard.multiLanguage', '多语言功能')}</span>
                    <span className={`font-medium ${getFeatureStatus(user?.canMultiLanguage || false).color}`}>
                      {getFeatureStatus(user?.canMultiLanguage || false).icon}
                    </span>
                  </div>
                </div>
              </div>

              {/* Upgrade CTA */}
              {user?.plan === 'free' && (
                <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">{t('dashboard.upgradeTitle', '升级到专业版')}</h3>
                  <p className="text-blue-800 mb-4">{t('dashboard.upgradeDesc', '解锁更多功能，提升您的简历创建体验')}</p>
                  <Link
                    href="/pricing"
                    className="btn-primary"
                  >
                    {t('dashboard.upgradeNow', '立即升级')}
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Profile Settings */}
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('dashboard.profileSettings', '个人资料设置')}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('dashboard.name', '姓名')}</label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      className="mt-1 input-field"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('dashboard.email', '邮箱')}</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="mt-1 input-field"
                      disabled
                    />
                  </div>
                  <button className="btn-secondary">
                    {t('dashboard.editProfile', '编辑资料')}
                  </button>
                </div>
              </div>

              {/* Account Settings */}
              <div className="card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{t('dashboard.accountSettings', '账户设置')}</h3>
                <div className="space-y-4">
                  <button className="btn-secondary w-full text-left">
                    {t('dashboard.changePassword', '修改密码')}
                  </button>
                  <button className="btn-secondary w-full text-left">
                    {t('dashboard.notificationSettings', '通知设置')}
                  </button>
                  <button className="btn-secondary w-full text-left">
                    {t('dashboard.privacySettings', '隐私设置')}
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="card border-red-200 bg-red-50">
                <h3 className="text-lg font-medium text-red-900 mb-4">{t('dashboard.dangerZone', '危险操作')}</h3>
                <div className="space-y-4">
                  <button className="btn-danger w-full text-left">
                    {t('dashboard.deleteAccount', '删除账户')}
                  </button>
                  <button className="btn-danger w-full text-left">
                    {t('dashboard.exportData', '导出数据')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 