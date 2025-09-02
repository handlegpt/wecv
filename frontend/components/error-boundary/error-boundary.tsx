'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  resetKeys?: any[]
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // 调用错误处理函数
    this.props.onError?.(error, errorInfo)

    // 记录错误到控制台
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // 在生产环境中，可以发送错误到错误追踪服务
    if (process.env.NODE_ENV === 'production') {
      // 例如：Sentry, LogRocket, 等
      // captureException(error, { extra: errorInfo })
    }
  }

  componentDidUpdate(prevProps: Props) {
    // 如果 resetKeys 发生变化，重置错误状态
    if (prevProps.resetKeys !== this.props.resetKeys) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
      })
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  handleGoBack = () => {
    window.history.back()
  }

  render() {
    if (this.state.hasError) {
      // 如果有自定义 fallback，使用它
      if (this.props.fallback) {
        return this.props.fallback
      }

      // 默认错误 UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            {/* 错误图标 */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>

            {/* 错误标题 */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              哎呀！出现了一些问题
            </h1>

            {/* 错误描述 */}
            <p className="text-gray-600 mb-6">
              我们遇到了一个意外的错误。请尝试刷新页面或返回首页。
            </p>

            {/* 错误详情（仅在开发环境显示） */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                  错误详情
                </summary>
                <div className="bg-gray-100 p-3 rounded text-xs font-mono text-gray-800 overflow-auto">
                  <div className="mb-2">
                    <strong>错误信息:</strong>
                    <div className="mt-1">{this.state.error.message}</div>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>组件栈:</strong>
                      <div className="mt-1 whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </div>
                    </div>
                  )}
                </div>
              </details>
            )}

            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={this.handleReset}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>重试</span>
              </Button>

              <Button
                onClick={this.handleGoBack}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>返回</span>
              </Button>

              <Button
                onClick={this.handleGoHome}
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>首页</span>
              </Button>
            </div>

            {/* 联系支持 */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                如果问题持续存在，请联系我们的支持团队
              </p>
              <a
                href="mailto:support@wecv.ai"
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                support@wecv.ai
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// 函数式错误边界 Hook
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  const handleError = React.useCallback((error: Error) => {
    setError(error)
    console.error('Error caught by useErrorHandler:', error)
  }, [])

  const clearError = React.useCallback(() => {
    setError(null)
  }, [])

  return { error, handleError, clearError }
}

// 异步错误处理 Hook
export function useAsyncError() {
  const [, setError] = React.useState()
  
  return React.useCallback((e: Error) => {
    setError(() => {
      throw e
    })
  }, [])
}

// 错误边界包装器
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) {
  return function ErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary fallback={fallback} onError={onError}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}
