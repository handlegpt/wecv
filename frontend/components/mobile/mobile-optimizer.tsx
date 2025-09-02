'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// 移动端检测 Hook
export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /mobile|android|iphone|ipad|phone/i.test(userAgent)
      const isTabletDevice = /tablet|ipad/i.test(userAgent)
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      setIsMobile(isMobileDevice)
      setIsTablet(isTabletDevice)
      setIsTouch(isTouchDevice)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return { isMobile, isTablet, isTouch }
}

// 触摸反馈组件
interface TouchFeedbackProps {
  children: React.ReactNode
  className?: string
  feedbackColor?: string
  onTap?: () => void
  disabled?: boolean
}

export function TouchFeedback({ 
  children, 
  className = "",
  feedbackColor = "bg-blue-100",
  onTap,
  disabled = false
}: TouchFeedbackProps) {
  const [isPressed, setIsPressed] = useState(false)

  const handleTouchStart = () => {
    if (!disabled) {
      setIsPressed(true)
    }
  }

  const handleTouchEnd = () => {
    if (!disabled) {
      setIsPressed(false)
      onTap?.()
    }
  }

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true)
    }
  }

  const handleMouseUp = () => {
    if (!disabled) {
      setIsPressed(false)
      onTap?.()
    }
  }

  const handleMouseLeave = () => {
    if (!disabled) {
      setIsPressed(false)
    }
  }

  return (
    <div
      className={cn(
        "transition-all duration-150 ease-out",
        isPressed && !disabled && feedbackColor,
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ 
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation'
      }}
    >
      {children}
    </div>
  )
}

// 移动端手势组件
interface SwipeableProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number
  className?: string
}

export function Swipeable({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  className = ""
}: SwipeableProps) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY)

    if (isHorizontalSwipe) {
      if (Math.abs(distanceX) > threshold) {
        if (distanceX > 0) {
          onSwipeLeft?.()
        } else {
          onSwipeRight?.()
        }
      }
    } else {
      if (Math.abs(distanceY) > threshold) {
        if (distanceY > 0) {
          onSwipeUp?.()
        } else {
          onSwipeDown?.()
        }
      }
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <div
      className={cn("touch-manipulation", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-y' }}
    >
      {children}
    </div>
  )
}

// 移动端优化的按钮组件
interface MobileButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  fullWidth?: boolean
}

export function MobileButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = "",
  fullWidth = false
}: MobileButtonProps) {
  const sizeClasses = {
    sm: 'h-10 px-3 text-sm',
    md: 'h-12 px-4 text-base',
    lg: 'h-14 px-6 text-lg'
  }

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100'
  }

  return (
    <TouchFeedback
      className={cn(
        "flex items-center justify-center font-medium rounded-lg transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        className
      )}
      onTap={onClick}
      disabled={disabled}
      feedbackColor="bg-blue-100"
    >
      {children}
    </TouchFeedback>
  )
}

// 移动端优化的输入组件
interface MobileInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  label?: string
  error?: string
  className?: string
  required?: boolean
}

export function MobileInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  label,
  error,
  className = "",
  required = false
}: MobileInputProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-3 border border-gray-300 rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "text-base placeholder-gray-500",
          "disabled:bg-gray-50 disabled:cursor-not-allowed",
          error && "border-red-500 focus:ring-red-500"
        )}
        style={{
          fontSize: '16px', // 防止 iOS 缩放
          WebkitAppearance: 'none',
          borderRadius: '8px'
        }}
      />
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

// 移动端优化的卡片组件
interface MobileCardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  hoverable?: boolean
  selected?: boolean
}

export function MobileCard({
  children,
  onClick,
  className = "",
  hoverable = true,
  selected = false
}: MobileCardProps) {
  return (
    <TouchFeedback
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-4",
        "transition-all duration-200",
        hoverable && "hover:shadow-md hover:border-gray-300",
        selected && "border-blue-500 bg-blue-50",
        onClick && "cursor-pointer",
        className
      )}
      onTap={onClick}
      feedbackColor="bg-gray-100"
    >
      {children}
    </TouchFeedback>
  )
}

// 移动端优化的导航组件
interface MobileNavProps {
  children: React.ReactNode
  className?: string
  sticky?: boolean
}

export function MobileNav({
  children,
  className = "",
  sticky = true
}: MobileNavProps) {
  return (
    <nav
      className={cn(
        "bg-white border-b border-gray-200",
        sticky && "sticky top-0 z-50",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {children}
        </div>
      </div>
    </nav>
  )
}
