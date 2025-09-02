// 安全工具函数集合

// HTML实体编码，防止XSS攻击
export const sanitizeHtml = (str: string): string => {
  if (typeof str !== 'string') return ''
  
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/\\/g, '&#x5C;')
}

// 文件名安全化，防止路径遍历攻击
export const sanitizeFileName = (name: string): string => {
  if (typeof name !== 'string') return 'resume'
  
  return name
    .replace(/[<>:"/\\|?*]/g, '_') // 移除非法字符
    .replace(/\.\./g, '_') // 防止路径遍历
    .replace(/^\./, '_') // 防止以点开头
    .replace(/^[a-zA-Z]:/, '') // 移除Windows驱动器标识
    .substring(0, 100) // 限制长度
    .trim()
}

// 输入长度验证
export const validateInputLength = (input: string, maxLength: number): boolean => {
  return typeof input === 'string' && input.length <= maxLength
}

// 邮箱格式验证
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// URL格式验证
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// 防止CSRF攻击的令牌生成
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// 验证CSRF令牌
export const validateCSRFToken = (token: string, storedToken: string): boolean => {
  return token === storedToken && token.length > 0
}

// 安全的JSON解析
export const safeJsonParse = <T>(jsonString: string, fallback: T): T => {
  try {
    return JSON.parse(jsonString) as T
  } catch {
    return fallback
  }
}

// 防止原型污染
export const safeObjectAssign = <T extends object>(target: T, source: object): T => {
  const result = { ...target }
  
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const value = (source as any)[key]
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        result[key as keyof T] = safeObjectAssign(result[key as keyof T] || {}, value) as T[keyof T]
      } else {
        result[key as keyof T] = value as T[keyof T]
      }
    }
  }
  
  return result
}

// 安全的深度克隆
export const safeDeepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof Array) return obj.map(item => safeDeepClone(item)) as T
  
  const cloned = {} as T
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = safeDeepClone(obj[key])
    }
  }
  
  return cloned
}

// 防止点击劫持的安全头
export const getSecurityHeaders = () => {
  return {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  }
}

// 安全的本地存储操作
export const safeLocalStorage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  
  set: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value)
      return true
    } catch {
      return false
    }
  },
  
  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  }
}

// 安全的会话存储操作
export const safeSessionStorage = {
  get: (key: string): string | null => {
    try {
      return sessionStorage.getItem(key)
    } catch {
      return null
    }
  },
  
  set: (key: string, value: string): boolean => {
    try {
      sessionStorage.setItem(key, value)
      return true
    } catch {
      return false
    }
  },
  
  remove: (key: string): boolean => {
    try {
      sessionStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  }
}

// 安全的Cookie操作
export const safeCookies = {
  get: (name: string): string | null => {
    try {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop()?.split(';').shift() || null
      return null
    } catch {
      return null
    }
  },
  
  set: (name: string, value: string, options: { expires?: number; path?: string; secure?: boolean; sameSite?: 'Strict' | 'Lax' | 'None' } = {}): boolean => {
    try {
      let cookie = `${name}=${value}`
      
      if (options.expires) {
        const date = new Date()
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
        cookie += `; expires=${date.toUTCString()}`
      }
      
      if (options.path) cookie += `; path=${options.path}`
      if (options.secure) cookie += '; secure'
      if (options.sameSite) cookie += `; samesite=${options.sameSite}`
      
      document.cookie = cookie
      return true
    } catch {
      return false
    }
  },
  
  remove: (name: string, path: string = '/'): boolean => {
    try {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`
      return true
    } catch {
      return false
    }
  }
}

// 防止暴力破解的速率限制
export class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map()
  private maxAttempts: number
  private windowMs: number

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts
    this.windowMs = windowMs
  }

  isAllowed(key: string): boolean {
    const now = Date.now()
    const attempt = this.attempts.get(key)

    if (!attempt || now > attempt.resetTime) {
      this.attempts.set(key, { count: 1, resetTime: now + this.windowMs })
      return true
    }

    if (attempt.count >= this.maxAttempts) {
      return false
    }

    attempt.count++
    return true
  }

  reset(key: string): void {
    this.attempts.delete(key)
  }
}

// 安全的错误处理
export const safeErrorHandler = (error: unknown, context: string = 'Unknown'): void => {
  // 生产环境不暴露详细错误信息
  if (process.env.NODE_ENV === 'production') {
    console.error(`Error in ${context}: Operation failed`)
  } else {
    console.error(`Error in ${context}:`, error)
  }
}

// 输入清理和验证
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return ''
  
  return input
    .trim()
    .replace(/\s+/g, ' ') // 多个空格替换为单个
    .replace(/[<>]/g, '') // 移除尖括号
    .substring(0, 1000) // 限制长度
}

// 安全的数字验证
export const safeNumberParse = (value: string, fallback: number = 0): number => {
  const parsed = parseFloat(value)
  return isNaN(parsed) ? fallback : parsed
}

// 安全的布尔值验证
export const safeBooleanParse = (value: string | boolean): boolean => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') {
    const lower = value.toLowerCase()
    return lower === 'true' || lower === '1' || lower === 'yes'
  }
  return false
}
