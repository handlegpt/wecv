'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

function GoogleSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslation()
  const [isProcessing, setIsProcessing] = useState(true)
  
  const token = searchParams.get('token')
  const userParam = searchParams.get('user')

  useEffect(() => {
    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam))
        
        // Store token and user info in localStorage
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        toast.success(t('messages.loginSuccess', '登录成功！'))
        router.push('/dashboard')
      } catch (error) {
        console.error('Error parsing user data:', error)
        toast.error(t('messages.loginFailed', '登录失败'))
        router.push('/auth/login')
      }
    } else {
      toast.error(t('messages.loginFailed', '登录失败'))
      router.push('/auth/login')
    }
  }, [token, userParam, router, t])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {t('messages.googleLoginSuccess', '谷歌登录成功')}
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              {t('messages.redirecting', '正在跳转...')}
            </p>
            {isProcessing && (
              <div className="mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GoogleSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-sm text-gray-600">加载中...</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <GoogleSuccessContent />
    </Suspense>
  )
} 