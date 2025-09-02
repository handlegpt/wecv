// 应用初始化文件
import { initializeModules } from './modules'
import { getCurrentEnvironment, isModuleEnabled } from './config/modules'

// 应用配置
export interface AppConfig {
  name: string
  version: string
  environment: string
  modules: {
    ui: boolean
    resume: boolean
    ai: boolean
    analytics: boolean
    collaboration: boolean
  }
  features: {
    darkMode: boolean
    i18n: boolean
    pwa: boolean
    offline: boolean
  }
}

// 默认应用配置
export const defaultAppConfig: AppConfig = {
  name: 'WeCV AI',
  version: '1.0.0',
  environment: getCurrentEnvironment(),
  modules: {
    ui: isModuleEnabled('ui'),
    resume: isModuleEnabled('resume'),
    ai: isModuleEnabled('ai'),
    analytics: isModuleEnabled('analytics'),
    collaboration: isModuleEnabled('collaboration'),
  },
  features: {
    darkMode: true,
    i18n: true,
    pwa: false,
    offline: false,
  }
}

// 应用初始化函数
export async function initializeApp(): Promise<AppConfig> {
  try {
    console.log('🚀 Initializing WeCV AI Application...')
    
    // 初始化模块系统
    initializeModules()
    console.log('✅ Module system initialized')
    
    // 检查环境配置
    const env = getCurrentEnvironment()
    console.log(`🌍 Environment: ${env}`)
    
    // 验证模块状态
    const moduleStatus = {
      ui: isModuleEnabled('ui'),
      resume: isModuleEnabled('resume'),
      ai: isModuleEnabled('ai'),
      analytics: isModuleEnabled('analytics'),
      collaboration: isModuleEnabled('collaboration'),
    }
    
    console.log('📦 Module status:', moduleStatus)
    
    // 更新配置
    const config: AppConfig = {
      ...defaultAppConfig,
      environment: env,
      modules: moduleStatus,
    }
    
    // 存储配置到全局
    if (typeof window !== 'undefined') {
      (window as any).__WECV_CONFIG__ = config
    }
    
    console.log('✅ Application initialized successfully')
    return config
    
  } catch (error) {
    console.error('❌ Failed to initialize application:', error)
    throw error
  }
}

// 获取应用配置
export function getAppConfig(): AppConfig {
  if (typeof window !== 'undefined' && (window as any).__WECV_CONFIG__) {
    return (window as any).__WECV_CONFIG__
  }
  return defaultAppConfig
}

// 检查功能是否启用
export function isFeatureEnabled(feature: keyof AppConfig['features']): boolean {
  const config = getAppConfig()
  return config.features[feature]
}

// 检查模块是否启用
export function isAppModuleEnabled(module: keyof AppConfig['modules']): boolean {
  const config = getAppConfig()
  return config.modules[module]
}

// 开发环境工具函数
export function devLog(message: string, data?: any) {
  if (getCurrentEnvironment() === 'development') {
    console.log(`🔧 [DEV] ${message}`, data || '')
  }
}

// 性能监控
export function measurePerformance<T>(name: string, fn: () => T): T {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  
  devLog(`Performance: ${name} took ${(end - start).toFixed(2)}ms`)
  return result
}
