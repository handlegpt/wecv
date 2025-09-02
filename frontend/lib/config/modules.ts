// 模块配置文件
export interface ModuleEnvironmentConfig {
  development: boolean
  production: boolean
  staging: boolean
}

export interface ModuleFeatureConfig {
  enabled: boolean
  config: Record<string, any>
}

export interface ModuleConfig {
  development: { enabled: boolean; config: Record<string, any> }
  production: { enabled: boolean; config: Record<string, any> }
  staging: { enabled: boolean; config: Record<string, any> }
}

export const moduleConfigs: Record<string, ModuleConfig> = {
  // UI模块配置
  ui: {
    development: { enabled: true, config: { debug: true, animations: true } },
    production: { enabled: true, config: { debug: false, animations: true } },
    staging: { enabled: true, config: { debug: false, animations: true } }
  },

  // 简历构建器模块配置
  resume: {
    development: { enabled: true, config: { autoSave: true, previewMode: 'live' } },
    production: { enabled: true, config: { autoSave: true, previewMode: 'manual' } },
    staging: { enabled: true, config: { autoSave: true, previewMode: 'live' } }
  },

  // AI助手模块配置
  ai: {
    development: { enabled: true, config: { model: 'gpt-4', maxTokens: 2000 } },
    production: { enabled: true, config: { model: 'gpt-4', maxTokens: 1500 } },
    staging: { enabled: true, config: { model: 'gpt-3.5-turbo', maxTokens: 2000 } }
  },

  // 分析模块配置
  analytics: {
    development: { enabled: false, config: { tracking: false } },
    production: { enabled: true, config: { tracking: true, privacy: 'strict' } },
    staging: { enabled: true, config: { tracking: true, privacy: 'strict' } }
  },

  // 协作模块配置
  collaboration: {
    development: { enabled: true, config: { realtime: true, maxUsers: 10 } },
    production: { enabled: true, config: { realtime: true, maxUsers: 50 } },
    staging: { enabled: true, config: { realtime: false, maxUsers: 20 } }
  }
}

// 获取当前环境
export function getCurrentEnvironment(): 'development' | 'production' | 'staging' {
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_ENV === 'staging' ? 'staging' : 'production'
  }
  return 'development'
}

// 获取模块配置
export function getModuleConfig(moduleName: keyof typeof moduleConfigs) {
  const env = getCurrentEnvironment()
  return moduleConfigs[moduleName][env]
}

// 检查模块是否启用
export function isModuleEnabled(moduleName: keyof typeof moduleConfigs): boolean {
  const config = getModuleConfig(moduleName)
  return config.enabled
}

// 获取模块配置值
export function getModuleConfigValue<T>(moduleName: keyof typeof moduleConfigs, key: string, defaultValue: T): T {
  const config = getModuleConfig(moduleName)
  return (config.config as Record<string, any>)[key] ?? defaultValue
}
