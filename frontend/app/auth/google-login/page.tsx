'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function GoogleLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslation()
  const code = searchParams.get('code')
  const errorParam = searchParams.get('error')

  useEffect(() => {
    if (errorParam) {
      setError(t('auth.googleLoginError', '谷歌登录失败'))
      toast.error(t('auth.googleLoginError', '谷歌登录失败'))
    } else if (code) {
      handleGoogleCallback(code)
    }
  }, [code, errorParam])

  const handleGoogleCallback = async (authCode: string) => {
    setIsLoading(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      
      const response = await fetch(`${apiUrl}/api/auth/google/callback`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ code: authCode })
      })
      
      if (response.ok) {
        const result = await response.json()
        localStorage.setItem('token', result.token)
        localStorage.setItem('user', JSON.stringify(result.user))
        toast.success(t('messages.loginSuccess', '登录成功！'))
        router.push('/dashboard')
      } else {
        const error = await response.json()
        setError(error.message || t('auth.googleLoginFailed', '谷歌登录失败'))
        toast.error(error.message || t('auth.googleLoginFailed', '谷歌登录失败'))
      }
    } catch (error) {
      console.error('Google login error:', error)
      setError(t('messages.networkError', '网络错误，请重试'))
      toast.error(t('messages.networkError', '网络错误，请重试'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    const redirectUri = `${window.location.origin}/auth/google-login`
    const scope = 'email profile'
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${googleClientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `scope=${encodeURIComponent(scope)}&` +
      `access_type=offline&` +
      `prompt=consent`

    window.location.href = googleAuthUrl
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                <svg className="h-6 w-6 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {t('messages.loggingIn', '正在登录...')}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {t('messages.pleaseWait', '请稍候')}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {t('auth.googleLoginFailed', '谷歌登录失败')}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {error}
              </p>
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full btn-primary"
                >
                  {t('auth.tryAgain', '重试')}
                </button>
                <Link href="/auth/login" className="block w-full btn-secondary">
                  {t('auth.backToLogin', '返回登录')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t('auth.googleLogin', '谷歌登录')} WeCV AI
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('auth.googleLoginDescription', '使用您的谷歌账户登录')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t('auth.continueWithGoogle', '使用谷歌账户继续')}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {t('auth.or', '或者')}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/auth/login" className="w-full btn-secondary block text-center">
                {t('auth.backToPasswordLogin', '返回密码登录')}
              </Link>
              <Link href="/auth/email-login" className="w-full btn-secondary block text-center">
                {t('auth.emailLoginOption', '使用邮件验证登录')}
              </Link>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {t('auth.noAccount', '没有账户？')}{' '}
                <Link href="/auth/register" className="font-medium text-primary-600 hover:text-primary-500">
                  {t('auth.registerNow', '立即注册')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 