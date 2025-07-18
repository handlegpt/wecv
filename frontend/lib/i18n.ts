import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// 中文翻译
const zhCN = {
  translation: {
    // 导航
    nav: {
      home: '首页',
      templates: '模板',
      pricing: '价格',
      login: '登录',
      register: '注册',
      dashboard: '控制台',
      admin: '管理后台'
    },
    // 首页
    hero: {
      title: 'AI驱动的智能简历构建器',
      subtitle: '使用人工智能技术创建专业简历，支持多语言、多模板、多格式导出',
      cta: '开始创建',
      ctaSecondary: '查看模板'
    },
    // 功能
    features: {
      aiWriting: 'AI辅助编写',
      multiLanguage: '多语言支持',
      templates: '丰富模板',
      export: '多格式导出',
      privacy: '隐私保护',
      hosting: '在线托管'
    },
    // 按钮
    buttons: {
      create: '创建简历',
      save: '保存',
      export: '导出',
      share: '分享',
      edit: '编辑',
      delete: '删除'
    }
  }
}

// 英文翻译
const enUS = {
  translation: {
    nav: {
      home: 'Home',
      templates: 'Templates',
      pricing: 'Pricing',
      login: 'Login',
      register: 'Register',
      dashboard: 'Dashboard',
      admin: 'Admin'
    },
    hero: {
      title: 'AI-Powered Resume Builder',
      subtitle: 'Create professional resumes with AI technology, supporting multiple languages, templates, and export formats',
      cta: 'Start Creating',
      ctaSecondary: 'View Templates'
    },
    features: {
      aiWriting: 'AI Writing Assistant',
      multiLanguage: 'Multi-language Support',
      templates: 'Rich Templates',
      export: 'Multiple Export Formats',
      privacy: 'Privacy Protection',
      hosting: 'Online Hosting'
    },
    buttons: {
      create: 'Create Resume',
      save: 'Save',
      export: 'Export',
      share: 'Share',
      edit: 'Edit',
      delete: 'Delete'
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'zh-CN': zhCN,
      'en-US': enUS
    },
    fallbackLng: 'zh-CN',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  })

export default i18n 