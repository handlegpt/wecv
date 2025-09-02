import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  fill?: boolean
  onClick?: () => void
  loading?: 'lazy' | 'eager'
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  onClick,
  loading = 'lazy',
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // 处理加载状态
  const handleLoad = () => {
    setIsLoading(false)
  }

  // 处理错误状态
  const handleError = () => {
    setError(true)
    setIsLoading(false)
  }

  // 如果图片加载失败，显示占位符
  if (error) {
    return (
      <div
        className={cn(
          'bg-gray-200 flex items-center justify-center text-gray-500',
          className
        )}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className={cn('relative', className)}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes}
        fill={fill}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        {...props}
      />
      
      {/* 加载状态指示器 */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}

// 响应式图片组件
export function ResponsiveImage({
  src,
  alt,
  className,
  priority = false,
  quality = 75,
  ...props
}: Omit<OptimizedImageProps, 'width' | 'height' | 'fill'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={0}
      height={0}
      fill
      className={cn('object-cover', className)}
      priority={priority}
      quality={quality}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  )
}

// 头像图片组件
export function AvatarImage({
  src,
  alt,
  size = 40,
  className,
  ...props
}: Omit<OptimizedImageProps, 'width' | 'height'> & { size?: number }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn('rounded-full object-cover', className)}
      {...props}
    />
  )
}

// 卡片图片组件
export function CardImage({
  src,
  alt,
  className,
  ...props
}: Omit<OptimizedImageProps, 'width' | 'height' | 'fill'>) {
  return (
    <ResponsiveImage
      src={src}
      alt={alt}
      className={cn('aspect-video', className)}
      {...props}
    />
  )
}
