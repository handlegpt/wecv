// UI Components Module Export
export { Button, buttonVariants } from './button'
export { Badge } from './badge'
export { Card, CardContent, CardHeader, CardTitle } from './card'
export { Progress } from './progress'
export { Textarea } from './textarea'
export { Skeleton } from './skeleton'
export { OptimizedImage, ResponsiveImage, AvatarImage, CardImage } from './optimized-image'
export { 
  Skeleton as BaseSkeleton,
  TextSkeleton,
  CardSkeleton,
  TableSkeleton,
  ListSkeleton,
  GridSkeleton,
  PageSkeleton,
  FormSkeleton
} from './advanced-skeleton'

// UI组件类型定义
export type { ButtonProps } from './button'
export type { BadgeProps } from './badge'
// 其他组件使用React.HTMLAttributes，不需要单独的类型定义
