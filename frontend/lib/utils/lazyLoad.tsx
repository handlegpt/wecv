import { Suspense, lazy, ComponentType } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

// 懒加载组件的加载状态组件
export function LazyLoadSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}

// 通用懒加载包装器
export function withLazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) {
  const LazyComponent = lazy(importFunc)
  const FallbackComponent = fallback || LazyLoadSkeleton
  
  return function LazyWrapper(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={<FallbackComponent />}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}

// 页面级别的懒加载
export function withPageLazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  return withLazyLoad(importFunc, () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">页面加载中...</p>
      </div>
    </div>
  ))
}

// 组件级别的懒加载
export function withComponentLazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  return withLazyLoad(importFunc, () => (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  ))
}

// 预加载函数 - 用于用户悬停时预加载
export function preloadComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  return () => {
    importFunc()
  }
}

// 条件懒加载 - 根据条件决定是否懒加载
export function withConditionalLazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  shouldLazyLoad: boolean,
  fallback?: React.ComponentType
) {
  if (!shouldLazyLoad) {
    // 直接导入
    return importFunc().then(module => module.default)
  }
  
  // 懒加载
  return withLazyLoad(importFunc, fallback)
}
