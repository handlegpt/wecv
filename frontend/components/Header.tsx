'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import LanguageSelector from './LanguageSelector'

interface HeaderProps {
  variant?: 'default' | 'dashboard' | 'admin'
  user?: any
  onLogout?: () => void
  title?: string
  onBack?: () => void
}

export function Header({ variant = 'default', user: propUser, onLogout, title, onBack }: HeaderProps) {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Auto-detect login status from localStorage
    const syncUser = () => {
      const token = localStorage.getItem('token')
      const userData = localStorage.getItem('user')
      if (token && userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error('Failed to parse user data:', error)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setUser(null)
        }
      } else {
        setUser(null)
      }
    }
    syncUser()
    window.addEventListener('storage', syncUser)
    return () => window.removeEventListener('storage', syncUser)
  }, [])

  // Use prop user if provided, otherwise use detected user
  const currentUser = propUser || user

  const navigation = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.templates'), href: '/templates' },
    { name: t('navigation.help'), href: '/help' },
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.pricing'), href: '#pricing' },
  ]

  const getPlanStatus = () => {
    if (!currentUser) return { status: 'free', color: 'bg-gray-100 text-gray-800' }
    
    if (currentUser.plan === 'pro') {
      return { status: 'pro', color: 'bg-blue-100 text-blue-800' }
    } else if (currentUser.plan === 'enterprise') {
      return { status: 'enterprise', color: 'bg-purple-100 text-purple-800' }
    } else {
      return { status: 'free', color: 'bg-gray-100 text-gray-800' }
    }
  }

  const planStatus = getPlanStatus()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    onLogout?.()
    window.location.href = '/'
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xl font-bold text-gray-900">WeCV</span>
                <span className="text-xl font-bold text-blue-600">AI</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {variant === 'default' && (
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Right side - Language Selector and Auth */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            {variant === 'default' ? (
              /* Desktop Auth Buttons */
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  {t('navigation.login')}
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-primary"
                >
                  {t('navigation.register')}
                </Link>
              </div>
            ) : variant === 'dashboard' && currentUser ? (
              /* Dashboard User Info */
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">{t('dashboard.welcome', '欢迎')}，{currentUser?.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${planStatus.color}`}>
                    {planStatus.status ? planStatus.status.toUpperCase() : ''}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-secondary"
                >
                  {t('nav.logout', '退出登录')}
                </button>
              </div>
            ) : variant === 'admin' ? (
              /* Admin Header */
              <div className="hidden md:flex items-center space-x-4">
                <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                {onBack && (
                  <button
                    onClick={onBack}
                    className="btn-secondary"
                  >
                    返回用户界面
                  </button>
                )}
              </div>
            ) : null}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {variant === 'default' ? (
                <>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 space-y-2">
                    <Link
                      href="/auth/login"
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('navigation.login')}
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block px-3 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('navigation.register')}
                    </Link>
                  </div>
                </>
              ) : variant === 'dashboard' && currentUser ? (
                <div className="pt-4 space-y-2">
                  <div className="px-3 py-2 text-gray-700">
                    {t('dashboard.welcome', '欢迎')}，{currentUser?.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium transition-colors duration-200"
                  >
                    {t('nav.logout', '退出登录')}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 