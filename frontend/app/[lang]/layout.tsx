import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

// 根据语言生成metadata
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang || 'en'
  
  // 这里可以根据语言返回不同的metadata
  const metadataMap = {
    en: {
      title: 'WeCV AI - Intelligent Resume Generation & Management Platform',
      description: 'WeCV AI helps global job seekers efficiently create professional resumes with AI-driven technology, multi-language and multi-template support, online hosting and export.',
      keywords: 'WeCV, AI Resume, Intelligent Resume, Job Search, Resume Templates, Resume Builder',
    },
    zh: {
      title: 'WeCV AI - 智能简历生成与管理平台',
      description: 'WeCV AI帮助全球求职者通过AI驱动技术、多语言和多模板支持、在线托管和导出功能高效创建专业简历。',
      keywords: 'WeCV, AI简历, 智能简历, 求职, 简历模板, 简历生成器',
    },
    'zh-tw': {
      title: 'WeCV AI - 智能簡歷生成與管理平台',
      description: 'WeCV AI幫助全球求職者通過AI驅動技術、多語言和多模板支持、在線託管和導出功能高效創建專業簡歷。',
      keywords: 'WeCV, AI簡歷, 智能簡歷, 求職, 簡歷模板, 簡歷生成器',
    },
    ja: {
      title: 'WeCV AI - インテリジェント履歴書生成・管理プラットフォーム',
      description: 'WeCV AIは、AI駆動技術、多言語・多テンプレート対応、オンラインホスティング、エクスポート機能により、世界中の求職者が効率的にプロフェッショナルな履歴書を作成できるよう支援します。',
      keywords: 'WeCV, AI履歴書, インテリジェント履歴書, 求職, 履歴書テンプレート, 履歴書ビルダー',
    },
    es: {
      title: 'WeCV AI - Plataforma de Generación y Gestión Inteligente de CV',
      description: 'WeCV AI ayuda a los buscadores de empleo globales a crear eficientemente CV profesionales con tecnología impulsada por IA, soporte multiidioma y multitemplate, alojamiento en línea y exportación.',
      keywords: 'WeCV, CV con IA, CV Inteligente, Búsqueda de Empleo, Plantillas de CV, Constructor de CV',
    },
    fr: {
      title: 'WeCV AI - Plateforme de Génération et Gestion Intelligente de CV',
      description: 'WeCV AI aide les chercheurs d\'emploi mondiaux à créer efficacement des CV professionnels avec une technologie alimentée par l\'IA, un support multilingue et multi-modèles, un hébergement en ligne et une exportation.',
      keywords: 'WeCV, CV IA, CV Intelligent, Recherche d\'Emploi, Modèles de CV, Constructeur de CV',
    },
    de: {
      title: 'WeCV AI - Intelligente Lebenslauf-Generierung und Verwaltungsplattform',
      description: 'WeCV AI hilft globalen Jobsuchenden dabei, effizient professionelle Lebensläufe mit KI-gestützter Technologie, mehrsprachiger und multi-template Unterstützung, Online-Hosting und Export zu erstellen.',
      keywords: 'WeCV, KI Lebenslauf, Intelligenter Lebenslauf, Jobsuche, Lebenslauf Vorlagen, Lebenslauf Generator',
    },
  }

  const metadata = metadataMap[lang as keyof typeof metadataMap] || metadataMap.en

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const lang = params.lang || 'en'
  
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 