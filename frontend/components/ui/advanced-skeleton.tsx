import { cn } from "@/lib/utils"

// 基础骨架屏组件
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  )
}

// 文本骨架屏
export function TextSkeleton({ 
  lines = 1, 
  className = "",
  lineHeight = "h-4",
  lastLineWidth = "w-3/4"
}: {
  lines?: number
  className?: string
  lineHeight?: string
  lastLineWidth?: string
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            lineHeight,
            index === lines - 1 ? lastLineWidth : "w-full"
          )}
        />
      ))}
    </div>
  )
}

// 卡片骨架屏
export function CardSkeleton({ 
  className = "",
  showImage = true,
  showTitle = true,
  showDescription = true,
  showActions = true
}: {
  className?: string
  showImage?: boolean
  showTitle?: boolean
  showDescription?: boolean
  showActions?: boolean
}) {
  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 p-6", className)}>
      {showImage && (
        <Skeleton className="w-full h-48 rounded-lg mb-4" />
      )}
      
      {showTitle && (
        <Skeleton className="h-6 w-3/4 mb-3" />
      )}
      
      {showDescription && (
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      )}
      
      {showActions && (
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-20" />
        </div>
      )}
    </div>
  )
}

// 表格骨架屏
export function TableSkeleton({ 
  rows = 5, 
  columns = 4,
  className = ""
}: {
  rows?: number
  columns?: number
  className?: string
}) {
  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 overflow-hidden", className)}>
      {/* 表头 */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <div className="flex space-x-4">
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} className="h-5 w-20" />
          ))}
        </div>
      </div>
      
      {/* 表格行 */}
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4">
            <div className="flex space-x-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton 
                  key={colIndex} 
                  className={cn(
                    "h-4",
                    colIndex === 0 ? "w-32" : "w-24"
                  )} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 列表骨架屏
export function ListSkeleton({ 
  items = 5, 
  className = "",
  showAvatar = true,
  showTitle = true,
  showSubtitle = true,
  showDescription = true
}: {
  items?: number
  className?: string
  showAvatar?: boolean
  showTitle?: boolean
  showSubtitle?: boolean
  showDescription?: boolean
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex space-x-3 p-4 bg-white rounded-lg border border-gray-200">
          {showAvatar && (
            <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
          )}
          
          <div className="flex-1 space-y-2">
            {showTitle && (
              <Skeleton className="h-5 w-3/4" />
            )}
            
            {showSubtitle && (
              <Skeleton className="h-4 w-1/2" />
            )}
            
            {showDescription && (
              <div className="space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// 网格骨架屏
export function GridSkeleton({ 
  rows = 3, 
  columns = 3,
  className = "",
  itemClassName = ""
}: {
  rows?: number
  columns?: number
  className?: string
  itemClassName?: string
}) {
  return (
    <div className={cn("grid gap-6", className)} style={{ 
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` 
    }}>
      {Array.from({ length: rows * columns }).map((_, index) => (
        <CardSkeleton key={index} className={itemClassName} />
      ))}
    </div>
  )
}

// 页面骨架屏
export function PageSkeleton({ 
  className = "",
  showHeader = true,
  showBreadcrumb = true,
  showContent = true,
  showSidebar = false
}: {
  className?: string
  showHeader?: boolean
  showBreadcrumb?: boolean
  showContent?: boolean
  showSidebar?: boolean
}) {
  return (
    <div className={cn("min-h-screen bg-gray-50", className)}>
      {showHeader && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-32" />
              <div className="flex space-x-4">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-20" />
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showBreadcrumb && (
          <div className="mb-6">
            <div className="flex space-x-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        )}
        
        <div className="flex space-x-8">
          {showContent && (
            <div className="flex-1">
              <Skeleton className="h-8 w-3/4 mb-6" />
              <div className="space-y-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-32 w-full" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CardSkeleton />
                  <CardSkeleton />
                </div>
              </div>
            </div>
          )}
          
          {showSidebar && (
            <div className="w-80">
              <CardSkeleton />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 表单骨架屏
export function FormSkeleton({ 
  fields = 5,
  className = "",
  showSubmit = true
}: {
  fields?: number
  className?: string
  showSubmit?: boolean
}) {
  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 p-6", className)}>
      <Skeleton className="h-6 w-1/3 mb-6" />
      
      <div className="space-y-4">
        {Array.from({ length: fields }).map((_, index) => (
          <div key={index}>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
      
      {showSubmit && (
        <div className="mt-6">
          <Skeleton className="h-12 w-32" />
        </div>
      )}
    </div>
  )
}

export { Skeleton }
