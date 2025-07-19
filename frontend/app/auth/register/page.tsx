'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { t } = useTranslation()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>()
  const password = watch('password')

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error(t('validation.passwordMismatch', '两次输入的密码不一致'))
      return
    }

    setIsLoading(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      console.log('Registering with API URL:', apiUrl)
      
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        })
      })
      
      console.log('Response status:', response.status)
      
      if (response.ok) {
        const result = await response.json()
        console.log('Registration successful:', result)
        toast.success(t('messages.registerSuccess', '注册成功！请登录'))
        router.push('/auth/login')
      } else {
        const error = await response.json()
        console.error('Registration failed:', error)
        toast.error(error.message || t('messages.registerFailed', '注册失败'))
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error(t('messages.networkError', '网络错误，请重试'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t('nav.register', 'Register')} WeCV AI
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('auth.haveAccount', '已有账号？')}{' '}
          <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
            {t('auth.loginNow', '立即登录')}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t('form.firstName', 'Name')}
              </label>
              <div className="mt-1">
                <input
                  {...register('name', { required: t('validation.nameRequired', '请输入姓名') })}
                  type="text"
                  className="input-field"
                  placeholder={t('form.firstName', 'Name')}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>

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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('form.password', 'Password')}
              </label>
              <div className="mt-1">
                <input
                  {...register('password', { 
                    required: t('validation.passwordRequired', '请输入密码'),
                    minLength: { value: 6, message: t('validation.passwordMinLength', '密码至少6位') }
                  })}
                  type="password"
                  className="input-field"
                  placeholder={t('form.password', 'Password')}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                {t('auth.confirmPassword', 'Confirm Password')}
              </label>
              <div className="mt-1">
                <input
                  {...register('confirmPassword', { 
                    required: t('validation.confirmPasswordRequired', '请确认密码'),
                    validate: value => value === password || t('validation.passwordMismatch', '两次输入的密码不一致')
                  })}
                  type="password"
                  className="input-field"
                  placeholder={t('auth.confirmPassword', 'Confirm Password')}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {isLoading ? t('messages.registering', '注册中...') : t('nav.register', 'Register')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 