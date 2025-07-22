'use client'

import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Mail, MessageCircle, BookOpen } from 'lucide-react'
import { Header } from '@/components/Header'

interface FAQ {
  question: string
  answer: string
}

export default function HelpPage() {
  const { t } = useTranslation()
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs: FAQ[] = [
    {
      question: t('help.faq1.question', 'How do I create my first resume?'),
      answer: t('help.faq1.answer', 'Click "Start Creating" on the homepage, choose a template, and fill in your information. You can preview and edit your resume in real-time.')
    },
    {
      question: t('help.faq2.question', 'Can I save my resume without registering?'),
      answer: t('help.faq2.answer', 'You can create and preview resumes without registering, but you need to create an account to save and export your resumes.')
    },
    {
      question: t('help.faq3.question', 'What file formats can I export my resume in?'),
      answer: t('help.faq3.answer', 'Currently we support PDF export. More formats like Word and HTML will be available soon.')
    },
    {
      question: t('help.faq4.question', 'How does the AI writing assistant work?'),
      answer: t('help.faq4.answer', 'Our AI assistant can help you write professional descriptions for your experience, skills, and summary. Simply click the AI button next to any section.')
    },
    {
      question: t('help.faq5.question', 'Can I use multiple templates?'),
      answer: t('help.faq5.answer', 'Yes! You can switch between templates at any time. Your content will be preserved when switching templates.')
    },
    {
      question: t('help.faq6.question', 'Is my data secure?'),
      answer: t('help.faq6.answer', 'Yes, we take data security seriously. All your information is encrypted and stored securely. You can read our privacy policy for more details.')
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">{t('help.quickActions', 'Quick Actions')}</h2>
              <div className="space-y-4">
                <a href="/builder" className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">{t('help.createResume', 'Create Resume')}</h3>
                    <p className="text-sm text-gray-600">{t('help.createResumeDesc', 'Start building your professional resume')}</p>
                  </div>
                </a>
                <a href="/templates" className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <BookOpen className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">{t('help.browseTemplates', 'Browse Templates')}</h3>
                    <p className="text-sm text-gray-600">{t('help.browseTemplatesDesc', 'Explore our resume templates')}</p>
                  </div>
                </a>
                <a href="mailto:support@wecv.ai" className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <Mail className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">{t('help.contactSupport', 'Contact Support')}</h3>
                    <p className="text-sm text-gray-600">{t('help.contactSupportDesc', 'Get help from our team')}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">{t('help.faq', 'Frequently Asked Questions')}</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">{t('help.needMoreHelp', 'Need More Help?')}</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {t('help.contactDesc', 'Can\'t find what you\'re looking for? Our support team is here to help you create the perfect resume.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@wecv.ai"
                className="btn-primary inline-flex items-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                {t('help.emailSupport', 'Email Support')}
              </a>
              <a
                href="/contact"
                className="btn-secondary inline-flex items-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('help.contactUs', 'Contact Us')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 