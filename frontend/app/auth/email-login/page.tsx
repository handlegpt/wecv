'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

interface EmailLoginForm {
  email: string
}

export default function EmailLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const router = useRouter()
  const { t } = useTranslation()
  const { register, handleSubmit, formState: { errors } } = useForm<EmailLoginForm>()

  const onSubmit = async (data: EmailLoginForm) => {
    setIsLoading(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      console.log('Sending email login with API URL:', apiUrl)
      
      const response = await fetch(`${apiUrl}/api/auth/email-login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: data.email
        })
      })
      
      console.log('Response status:', response.status)
      
      if (response.ok) {
        const result = await response.json()
        console.log('Email login successful:', result)
        setEmailSent(true)
        toast.success(t('messages.emailSent', '验证邮件已发送，请检查您的邮箱'))
      } else {
        const error = await response.json()
        console.error('Email login failed:', error)
        toast.error(error.message || t('messages.emailLoginFailed', '邮件发送失败'))
      }
    } catch (error) {
      console.error('Email login error:', error)
      toast.error(t('messages.networkError', '网络错误，请重试'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t('auth.emailLogin', 'Email Login')} WeCV AI
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('auth.emailLoginDescription', '输入您的邮箱，我们将发送登录链接')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!emailSent ? (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('form.email', 'Email')}
                </label>
                <div className="mt-1">
                  <input
                    {...register('email', { 
                      required: t('validation.emailRequired', '请输入邮箱'),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t('validation.emailInvalid', '请输入有效的邮箱地址')
                      }
                    })}
                    type="email"
                    className="input-field"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {isLoading ? t('messages.sending', '发送中...') : t('auth.sendLoginLink', '发送登录链接')}
                </button>
              </div>

              <div className="text-center">
                <Link href="/auth/login" className="text-sm text-primary-600 hover:text-primary-500">
                  {t('auth.backToPasswordLogin', '返回密码登录')}
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {t('messages.emailSentTitle', '邮件已发送')}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {t('messages.emailSentDescription', '请检查您的邮箱并点击登录链接')}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setEmailSent(false)}
                  className="btn-secondary"
                >
                  {t('auth.sendAnotherEmail', '重新发送邮件')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 