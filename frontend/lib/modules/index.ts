// 模块管理系统
export interface ModuleConfig {
  id: string
  name: string
  version: string
  dependencies?: string[]
  enabled: boolean
  config?: Record<string, any>
}

export interface ModuleManager {
  register(module: ModuleConfig): void
  unregister(moduleId: string): void
  getModule(moduleId: string): ModuleConfig | undefined
  getAllModules(): ModuleConfig[]
  isModuleEnabled(moduleId: string): boolean
}

class ModuleRegistry implements ModuleManager {
  private modules = new Map<string, ModuleConfig>()

  register(module: ModuleConfig): void {
    this.modules.set(module.id, module)
    console.log(`Module registered: ${module.name} v${module.version}`)
  }

  unregister(moduleId: string): void {
    this.modules.delete(moduleId)
    console.log(`Module unregistered: ${moduleId}`)
  }

  getModule(moduleId: string): ModuleConfig | undefined {
    return this.modules.get(moduleId)
  }

  getAllModules(): ModuleConfig[] {
    return Array.from(this.modules.values())
  }

  isModuleEnabled(moduleId: string): boolean {
    const module = this.modules.get(moduleId)
    return module?.enabled ?? false
  }
}

// 全局模块注册表
export const moduleRegistry = new ModuleRegistry()

// 预定义模块配置
export const coreModules: ModuleConfig[] = [
  {
    id: 'ui',
    name: 'UI Components',
    version: '1.0.0',
    enabled: true,
    config: {
      theme: 'default',
      animations: true
    }
  },
  {
    id: 'resume',
    name: 'Resume Builder',
    version: '1.0.0',
    dependencies: ['ui'],
    enabled: true
  },
  {
    id: 'auth',
    name: 'Authentication',
    version: '1.0.0',
    dependencies: ['ui'],
    enabled: true
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    version: '1.0.0',
    dependencies: ['ui', 'resume'],
    enabled: true
  }
]

// 初始化核心模块
export function initializeModules(): void {
  coreModules.forEach(module => {
    moduleRegistry.register(module)
  })
}

// 模块加载器
export async function loadModule(moduleId: string): Promise<any> {
  const module = moduleRegistry.getModule(moduleId)
  if (!module || !module.enabled) {
    throw new Error(`Module ${moduleId} is not available or disabled`)
  }
  
  // 检查依赖
  if (module.dependencies) {
    for (const dep of module.dependencies) {
      if (!moduleRegistry.isModuleEnabled(dep)) {
        throw new Error(`Module ${moduleId} depends on ${dep} which is not enabled`)
      }
    }
  }
  
  return module
}
