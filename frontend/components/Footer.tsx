'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Sparkles, Mail, Twitter, Linkedin, Github } from 'lucide-react'

export function Footer() {
  const { t } = useTranslation()

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xl font-bold">WeCV</span>
                <span className="text-xl font-bold text-blue-400">AI</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {t('site.description', 'WeCV AI helps global job seekers efficiently create professional resumes with AI-driven technology, multi-language and multi-template support, online hosting and export.')}
            </p>
            <div className="flex space-x-4">
              <a href="mailto:contact@wecv.ai" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/wecvai" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/wecvai" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/wecvai" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">产品</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/templates" className="text-gray-300 hover:text-white transition-colors">
                  {t('navigation.templates', 'Templates')}
                </Link>
              </li>
              <li>
                <Link href="/builder" className="text-gray-300 hover:text-white transition-colors">
                  {t('buttons.create', 'Create Resume')}
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                  {t('navigation.pricing', 'Pricing')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">法律</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  {t('privacy.title', 'Privacy & Security')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  服务条款
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-300 hover:text-white transition-colors">
                  Cookie政策
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} WeCV AI. 保留所有权利。
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              {t('privacy.title', 'Privacy')}
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              服务条款
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie政策
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 