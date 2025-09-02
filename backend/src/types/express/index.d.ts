import 'express'

declare module 'express' {
  export interface Request {
    userId?: string
    user?: {
      id: string
      email: string
      role?: string
      settings?: any
      [key: string]: any
    }
  }
} 