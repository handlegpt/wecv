import { Inter, Noto_Sans, Noto_Sans_JP, Noto_Sans_SC } from 'next/font/google'

// 主要字体 - Inter (英文)
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-inter',
  adjustFontFallback: true,
})

// 中文字体 - Noto Sans SC
export const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-noto-sans-sc',
  weight: ['300', '400', '500', '600', '700'],
})

// 日文字体 - Noto Sans JP
export const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-noto-sans-jp',
  weight: ['300', '400', '500', '600', '700'],
})

// 通用字体 - Noto Sans
export const notoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-noto-sans',
  weight: ['300', '400', '500', '600', '700'],
})

// 字体配置映射
export const fontConfigs = {
  'en-US': {
    primary: inter,
    fallback: notoSans,
  },
  'zh-CN': {
    primary: notoSansSC,
    fallback: inter,
  },
  'zh-TW': {
    primary: notoSansSC,
    fallback: inter,
  },
  'ja-JP': {
    primary: notoSansJP,
    fallback: inter,
  },
  'default': {
    primary: inter,
    fallback: notoSans,
  },
}

// 获取字体配置
export function getFontConfig(locale: string) {
  return fontConfigs[locale as keyof typeof fontConfigs] || fontConfigs.default
}

// 字体预加载函数
export function preloadFonts() {
  // Next.js 会自动处理字体预加载，这里只需要确保字体配置正确
  console.log('Fonts configured for preloading')
}

// 字体性能监控
export function monitorFontPerformance() {
  if (typeof window === 'undefined') return

  // 监控字体加载性能
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'font') {
        const fontEntry = entry as PerformanceEntry & { family: string }
        console.log(`Font loaded: ${fontEntry.family} in ${fontEntry.duration}ms`)
        
        // 可以发送到分析服务
        if (process.env.NODE_ENV === 'production') {
          // analytics.track('font_loaded', {
          //   family: fontEntry.family,
          //   duration: fontEntry.duration,
          //   size: fontEntry.transferSize
          // })
        }
      }
    }
  })

  observer.observe({ entryTypes: ['font'] })
}

// 字体回退策略
export function getFontFallback(locale: string) {
  const config = getFontConfig(locale)
  return `${config.primary.variable}, ${config.fallback.variable}, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
}

// 导出字体变量
export const fontVariables = {
  inter: inter.variable,
  notoSansSC: notoSansSC.variable,
  notoSansJP: notoSansJP.variable,
  notoSans: notoSans.variable,
}
