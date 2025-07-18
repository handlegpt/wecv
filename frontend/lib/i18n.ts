import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// English translations (default)
const enUS = {
  translation: {
    // Navigation
    nav: {
      home: 'Home',
      templates: 'Templates',
      pricing: 'Pricing',
      login: 'Login',
      register: 'Register',
      dashboard: 'Dashboard',
      admin: 'Admin',
      settings: 'Settings',
      logout: 'Logout'
    },
    // Homepage
    hero: {
      title: 'AI-Powered Resume Builder',
      subtitle: 'Create professional resumes with AI technology, supporting multiple languages, templates, and export formats',
      cta: 'Start Creating',
      ctaSecondary: 'View Templates'
    },
    // Features
    features: {
      aiWriting: 'AI Writing Assistant',
      multiLanguage: 'Multi-language Support',
      templates: 'Rich Templates',
      export: 'Multiple Export Formats',
      privacy: 'Privacy Protection',
      hosting: 'Online Hosting',
      analytics: 'Resume Analytics'
    },
    // Buttons
    buttons: {
      create: 'Create Resume',
      save: 'Save',
      export: 'Export',
      share: 'Share',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
      confirm: 'Confirm',
      upload: 'Upload',
      download: 'Download'
    },
    // Resume sections
    resume: {
      personalInfo: 'Personal Information',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills',
      projects: 'Projects',
      languages: 'Languages',
      certifications: 'Certifications',
      interests: 'Interests',
      summary: 'Summary',
      summaryPlaceholder: 'Write a brief professional summary...',
      skillsPlaceholder: 'List your key skills and competencies...',
      content: 'Content',
      language: 'Language'
    },
    // Form labels
    form: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      website: 'Website',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      company: 'Company',
      position: 'Position',
      startDate: 'Start Date',
      endDate: 'End Date',
      description: 'Description',
      school: 'School',
      degree: 'Degree',
      field: 'Field of Study',
      gpa: 'GPA',
      skill: 'Skill',
      level: 'Level',
      projectName: 'Project Name',
      projectUrl: 'Project URL',
      language: 'Language',
      proficiency: 'Proficiency'
    },
    // Messages
    messages: {
      saved: 'Resume saved successfully',
      exported: 'Resume exported successfully',
      deleted: 'Resume deleted successfully',
      error: 'An error occurred',
      loading: 'Loading...',
      noData: 'No data available'
    },
    // Settings
    settings: {
      multilanguage: 'Multilanguage Settings',
      languagePreferences: 'Language Preferences',
      preferredLanguage: 'Preferred Language',
      languageInfo: 'Language Information',
      supportedLanguages: 'Supported Languages',
      resumeTranslations: 'Resume Translations',
      resumes: 'resumes',
      originalLanguage: 'Original Language',
      noResumes: 'No resumes found'
    }
  }
}

// Simplified Chinese translations
const zhCN = {
  translation: {
    nav: {
      home: '首页',
      templates: '模板',
      pricing: '价格',
      login: '登录',
      register: '注册',
      dashboard: '控制台',
      admin: '管理后台',
      settings: '设置',
      logout: '退出'
    },
    hero: {
      title: 'AI驱动的智能简历构建器',
      subtitle: '使用人工智能技术创建专业简历，支持多语言、多模板、多格式导出',
      cta: '开始创建',
      ctaSecondary: '查看模板'
    },
    features: {
      aiWriting: 'AI辅助编写',
      multiLanguage: '多语言支持',
      templates: '丰富模板',
      export: '多格式导出',
      privacy: '隐私保护',
      hosting: '在线托管',
      analytics: '简历分析'
    },
    buttons: {
      create: '创建简历',
      save: '保存',
      export: '导出',
      share: '分享',
      edit: '编辑',
      delete: '删除',
      cancel: '取消',
      confirm: '确认',
      upload: '上传',
      download: '下载'
    },
    resume: {
      personalInfo: '个人信息',
      experience: '工作经验',
      education: '教育背景',
      skills: '技能',
      projects: '项目',
      languages: '语言',
      certifications: '证书',
      interests: '兴趣爱好',
      summary: '摘要',
      summaryPlaceholder: '写一个简短的专业摘要...',
      skillsPlaceholder: '列出你的关键技能和能力...',
      content: '内容',
      language: '语言'
    },
    form: {
      firstName: '名',
      lastName: '姓',
      email: '邮箱',
      phone: '电话',
      address: '地址',
      website: '网站',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      company: '公司',
      position: '职位',
      startDate: '开始日期',
      endDate: '结束日期',
      description: '描述',
      school: '学校',
      degree: '学位',
      field: '专业',
      gpa: 'GPA',
      skill: '技能',
      level: '水平',
      projectName: '项目名称',
      projectUrl: '项目链接',
      language: '语言',
      proficiency: '熟练程度'
    },
    messages: {
      saved: '简历保存成功',
      exported: '简历导出成功',
      deleted: '简历删除成功',
      error: '发生错误',
      loading: '加载中...',
      noData: '暂无数据'
    },
    // Settings
    settings: {
      multilanguage: '多语言设置',
      languagePreferences: '语言偏好',
      preferredLanguage: '首选语言',
      languageInfo: '语言信息',
      supportedLanguages: '支持的语言',
      resumeTranslations: '简历翻译',
      resumes: '简历',
      originalLanguage: '原始语言',
      noResumes: '未找到简历'
    }
  }
}

// Traditional Chinese translations
const zhTW = {
  translation: {
    nav: {
      home: '首頁',
      templates: '範本',
      pricing: '價格',
      login: '登入',
      register: '註冊',
      dashboard: '控制台',
      admin: '管理後台',
      settings: '設定',
      logout: '登出'
    },
    hero: {
      title: 'AI驅動的智能履歷建構器',
      subtitle: '使用人工智慧技術建立專業履歷，支援多語言、多範本、多格式匯出',
      cta: '開始建立',
      ctaSecondary: '查看範本'
    },
    features: {
      aiWriting: 'AI輔助撰寫',
      multiLanguage: '多語言支援',
      templates: '豐富範本',
      export: '多格式匯出',
      privacy: '隱私保護',
      hosting: '線上託管',
      analytics: '履歷分析'
    },
    buttons: {
      create: '建立履歷',
      save: '儲存',
      export: '匯出',
      share: '分享',
      edit: '編輯',
      delete: '刪除',
      cancel: '取消',
      confirm: '確認',
      upload: '上傳',
      download: '下載'
    },
    resume: {
      personalInfo: '個人資訊',
      experience: '工作經驗',
      education: '教育背景',
      skills: '技能',
      projects: '專案',
      languages: '語言',
      certifications: '證書',
      interests: '興趣愛好',
      summary: '摘要',
      summaryPlaceholder: '寫一個簡短的專業摘要...',
      skillsPlaceholder: '列出你的關鍵技能和能力...',
      content: '內容',
      language: '語言'
    },
    form: {
      firstName: '名',
      lastName: '姓',
      email: '電子郵件',
      phone: '電話',
      address: '地址',
      website: '網站',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      company: '公司',
      position: '職位',
      startDate: '開始日期',
      endDate: '結束日期',
      description: '描述',
      school: '學校',
      degree: '學位',
      field: '專業',
      gpa: 'GPA',
      skill: '技能',
      level: '水準',
      projectName: '專案名稱',
      projectUrl: '專案連結',
      language: '語言',
      proficiency: '熟練程度'
    },
    messages: {
      saved: '履歷儲存成功',
      exported: '履歷匯出成功',
      deleted: '履歷刪除成功',
      error: '發生錯誤',
      loading: '載入中...',
      noData: '暫無資料'
    },
    // Settings
    settings: {
      multilanguage: '多語言設定',
      languagePreferences: '語言偏好',
      preferredLanguage: '首選語言',
      languageInfo: '語言資訊',
      supportedLanguages: '支援的語言',
      resumeTranslations: '履歷翻譯',
      resumes: '履歷',
      originalLanguage: '原始語言',
      noResumes: '未找到履歷'
    }
  }
}

// Japanese translations
const jaJP = {
  translation: {
    nav: {
      home: 'ホーム',
      templates: 'テンプレート',
      pricing: '料金',
      login: 'ログイン',
      register: '登録',
      dashboard: 'ダッシュボード',
      admin: '管理',
      settings: '設定',
      logout: 'ログアウト'
    },
    hero: {
      title: 'AI駆動の履歴書ビルダー',
      subtitle: 'AI技術を使用してプロフェッショナルな履歴書を作成し、多言語、多テンプレート、多形式エクスポートをサポート',
      cta: '作成開始',
      ctaSecondary: 'テンプレートを見る'
    },
    features: {
      aiWriting: 'AI執筆アシスタント',
      multiLanguage: '多言語サポート',
      templates: '豊富なテンプレート',
      export: '多形式エクスポート',
      privacy: 'プライバシー保護',
      hosting: 'オンラインホスティング',
      analytics: '履歴書分析'
    },
    buttons: {
      create: '履歴書作成',
      save: '保存',
      export: 'エクスポート',
      share: '共有',
      edit: '編集',
      delete: '削除',
      cancel: 'キャンセル',
      confirm: '確認',
      upload: 'アップロード',
      download: 'ダウンロード'
    },
    resume: {
      personalInfo: '個人情報',
      experience: '職歴',
      education: '学歴',
      skills: 'スキル',
      projects: 'プロジェクト',
      languages: '言語',
      certifications: '資格',
      interests: '趣味',
      summary: '概要',
      summaryPlaceholder: '簡潔な専門的な概要を書く...',
      skillsPlaceholder: '主要なスキルと能力をリストアップする...',
      content: '内容',
      language: '言語'
    },
    form: {
      firstName: '名',
      lastName: '姓',
      email: 'メール',
      phone: '電話',
      address: '住所',
      website: 'ウェブサイト',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      company: '会社',
      position: '役職',
      startDate: '開始日',
      endDate: '終了日',
      description: '説明',
      school: '学校',
      degree: '学位',
      field: '専攻',
      gpa: 'GPA',
      skill: 'スキル',
      level: 'レベル',
      projectName: 'プロジェクト名',
      projectUrl: 'プロジェクトURL',
      language: '言語',
      proficiency: '熟練度'
    },
    messages: {
      saved: '履歴書が正常に保存されました',
      exported: '履歴書が正常にエクスポートされました',
      deleted: '履歴書が正常に削除されました',
      error: 'エラーが発生しました',
      loading: '読み込み中...',
      noData: 'データがありません'
    },
    // Settings
    settings: {
      multilanguage: '多言語設定',
      languagePreferences: '言語設定',
      preferredLanguage: '優先言語',
      languageInfo: '言語情報',
      supportedLanguages: 'サポート言語',
      resumeTranslations: '履歴書翻訳',
      resumes: '履歴書',
      originalLanguage: '元の言語',
      noResumes: '履歴書が見つかりません'
    }
  }
}

// Spanish translations
const esES = {
  translation: {
    nav: {
      home: 'Inicio',
      templates: 'Plantillas',
      pricing: 'Precios',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      dashboard: 'Panel',
      admin: 'Administrador',
      settings: 'Configuración',
      logout: 'Cerrar Sesión'
    },
    hero: {
      title: 'Constructor de CV con IA',
      subtitle: 'Crea currículums profesionales con tecnología de IA, compatible con múltiples idiomas, plantillas y formatos de exportación',
      cta: 'Comenzar a Crear',
      ctaSecondary: 'Ver Plantillas'
    },
    features: {
      aiWriting: 'Asistente de Escritura IA',
      multiLanguage: 'Soporte Multiidioma',
      templates: 'Plantillas Abundantes',
      export: 'Múltiples Formatos de Exportación',
      privacy: 'Protección de Privacidad',
      hosting: 'Alojamiento en Línea',
      analytics: 'Análisis de CV'
    },
    buttons: {
      create: 'Crear CV',
      save: 'Guardar',
      export: 'Exportar',
      share: 'Compartir',
      edit: 'Editar',
      delete: 'Eliminar',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      upload: 'Subir',
      download: 'Descargar'
    },
    resume: {
      personalInfo: 'Información Personal',
      experience: 'Experiencia Laboral',
      education: 'Educación',
      skills: 'Habilidades',
      projects: 'Proyectos',
      languages: 'Idiomas',
      certifications: 'Certificaciones',
      interests: 'Intereses',
      summary: 'Resumen',
      summaryPlaceholder: 'Escriba un resumen profesional breve...',
      skillsPlaceholder: 'Enumere sus habilidades clave y competencias...',
      content: 'Contenido',
      language: 'Idioma'
    },
    form: {
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electrónico',
      phone: 'Teléfono',
      address: 'Dirección',
      website: 'Sitio Web',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      company: 'Empresa',
      position: 'Cargo',
      startDate: 'Fecha de Inicio',
      endDate: 'Fecha de Fin',
      description: 'Descripción',
      school: 'Escuela',
      degree: 'Título',
      field: 'Campo de Estudio',
      gpa: 'GPA',
      skill: 'Habilidad',
      level: 'Nivel',
      projectName: 'Nombre del Proyecto',
      projectUrl: 'URL del Proyecto',
      language: 'Idioma',
      proficiency: 'Nivel de Competencia'
    },
    messages: {
      saved: 'CV guardado exitosamente',
      exported: 'CV exportado exitosamente',
      deleted: 'CV eliminado exitosamente',
      error: 'Ocurrió un error',
      loading: 'Cargando...',
      noData: 'No hay datos disponibles'
    },
    // Settings
    settings: {
      multilanguage: 'Configuración Multilingüe',
      languagePreferences: 'Preferencias de Lenguaje',
      preferredLanguage: 'Lenguaje Preferido',
      languageInfo: 'Información del Lenguaje',
      supportedLanguages: 'Lenguajes Soportados',
      resumeTranslations: 'Traducciones de CV',
      resumes: 'CV',
      originalLanguage: 'Lenguaje Original',
      noResumes: 'No se encontraron CV'
    }
  }
}

// French translations
const frFR = {
  translation: {
    nav: {
      home: 'Accueil',
      templates: 'Modèles',
      pricing: 'Tarifs',
      login: 'Connexion',
      register: 'S\'inscrire',
      dashboard: 'Tableau de Bord',
      admin: 'Administration',
      settings: 'Paramètres',
      logout: 'Déconnexion'
    },
    hero: {
      title: 'Constructeur de CV IA',
      subtitle: 'Créez des CV professionnels avec la technologie IA, prenant en charge plusieurs langues, modèles et formats d\'exportation',
      cta: 'Commencer à Créer',
      ctaSecondary: 'Voir les Modèles'
    },
    features: {
      aiWriting: 'Assistant d\'Écriture IA',
      multiLanguage: 'Support Multilingue',
      templates: 'Modèles Riches',
      export: 'Formats d\'Exportation Multiples',
      privacy: 'Protection de la Vie Privée',
      hosting: 'Hébergement en Ligne',
      analytics: 'Analyse de CV'
    },
    buttons: {
      create: 'Créer un CV',
      save: 'Sauvegarder',
      export: 'Exporter',
      share: 'Partager',
      edit: 'Modifier',
      delete: 'Supprimer',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      upload: 'Télécharger',
      download: 'Télécharger'
    },
    resume: {
      personalInfo: 'Informations Personnelles',
      experience: 'Expérience Professionnelle',
      education: 'Formation',
      skills: 'Compétences',
      projects: 'Projets',
      languages: 'Langues',
      certifications: 'Certifications',
      interests: 'Centres d\'Intérêt',
      summary: 'Résumé',
      summaryPlaceholder: 'Écrivez un résumé professionnel succinct...',
      skillsPlaceholder: 'Énumérez vos compétences clés et vos compétences...',
      content: 'Contenu',
      language: 'Langue'
    },
    form: {
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      address: 'Adresse',
      website: 'Site Web',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      company: 'Entreprise',
      position: 'Poste',
      startDate: 'Date de Début',
      endDate: 'Date de Fin',
      description: 'Description',
      school: 'École',
      degree: 'Diplôme',
      field: 'Domaine d\'Étude',
      gpa: 'GPA',
      skill: 'Compétence',
      level: 'Niveau',
      projectName: 'Nom du Projet',
      projectUrl: 'URL du Projet',
      language: 'Langue',
      proficiency: 'Niveau de Maîtrise'
    },
    messages: {
      saved: 'CV sauvegardé avec succès',
      exported: 'CV exporté avec succès',
      deleted: 'CV supprimé avec succès',
      error: 'Une erreur s\'est produite',
      loading: 'Chargement...',
      noData: 'Aucune donnée disponible'
    },
    // Settings
    settings: {
      multilanguage: 'Paramètres Multilingues',
      languagePreferences: 'Préférences de Langue',
      preferredLanguage: 'Langue Préférée',
      languageInfo: 'Informations sur la Langue',
      supportedLanguages: 'Langues Supportées',
      resumeTranslations: 'Traductions de CV',
      resumes: 'CV',
      originalLanguage: 'Langue Originale',
      noResumes: 'Aucun CV trouvé'
    }
  }
}

// German translations
const deDE = {
  translation: {
    nav: {
      home: 'Startseite',
      templates: 'Vorlagen',
      pricing: 'Preise',
      login: 'Anmelden',
      register: 'Registrieren',
      dashboard: 'Dashboard',
      admin: 'Administration',
      settings: 'Einstellungen',
      logout: 'Abmelden'
    },
    hero: {
      title: 'KI-gestützter Lebenslauf-Generator',
      subtitle: 'Erstellen Sie professionelle Lebensläufe mit KI-Technologie, unterstützt mehrere Sprachen, Vorlagen und Exportformate',
      cta: 'Erstellen Starten',
      ctaSecondary: 'Vorlagen Anzeigen'
    },
    features: {
      aiWriting: 'KI-Schreibassistent',
      multiLanguage: 'Mehrsprachige Unterstützung',
      templates: 'Reichhaltige Vorlagen',
      export: 'Mehrere Exportformate',
      privacy: 'Datenschutz',
      hosting: 'Online-Hosting',
      analytics: 'Lebenslauf-Analyse'
    },
    buttons: {
      create: 'Lebenslauf Erstellen',
      save: 'Speichern',
      export: 'Exportieren',
      share: 'Teilen',
      edit: 'Bearbeiten',
      delete: 'Löschen',
      cancel: 'Abbrechen',
      confirm: 'Bestätigen',
      upload: 'Hochladen',
      download: 'Herunterladen'
    },
    resume: {
      personalInfo: 'Persönliche Informationen',
      experience: 'Berufserfahrung',
      education: 'Ausbildung',
      skills: 'Fähigkeiten',
      projects: 'Projekte',
      languages: 'Sprachen',
      certifications: 'Zertifizierungen',
      interests: 'Interessen',
      summary: 'Zusammenfassung',
      summaryPlaceholder: 'Schreiben Sie eine kurze professionelle Zusammenfassung...',
      skillsPlaceholder: 'Listen Sie Ihre wichtigsten Fähigkeiten und Kompetenzen auf...',
      content: 'Inhalt',
      language: 'Sprache'
    },
    form: {
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail',
      phone: 'Telefon',
      address: 'Adresse',
      website: 'Website',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      company: 'Unternehmen',
      position: 'Position',
      startDate: 'Startdatum',
      endDate: 'Enddatum',
      description: 'Beschreibung',
      school: 'Schule',
      degree: 'Abschluss',
      field: 'Studienfach',
      gpa: 'GPA',
      skill: 'Fähigkeit',
      level: 'Niveau',
      projectName: 'Projektname',
      projectUrl: 'Projekt-URL',
      language: 'Sprache',
      proficiency: 'Kompetenzstufe'
    },
    messages: {
      saved: 'Lebenslauf erfolgreich gespeichert',
      exported: 'Lebenslauf erfolgreich exportiert',
      deleted: 'Lebenslauf erfolgreich gelöscht',
      error: 'Ein Fehler ist aufgetreten',
      loading: 'Laden...',
      noData: 'Keine Daten verfügbar'
    },
    // Settings
    settings: {
      multilanguage: 'Mehrsprachige Einstellungen',
      languagePreferences: 'Sprachpräferenzen',
      preferredLanguage: 'Bevorzugte Sprache',
      languageInfo: 'Sprachinformationen',
      supportedLanguages: 'Unterstützte Sprachen',
      resumeTranslations: 'Lebenslauf-Übersetzungen',
      resumes: 'Lebensläufe',
      originalLanguage: 'Ursprüngliche Sprache',
      noResumes: 'Keine Lebensläufe gefunden'
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'en-US': enUS,
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'ja-JP': jaJP,
      'es-ES': esES,
      'fr-FR': frFR,
      'de-DE': deDE
    },
    fallbackLng: 'en-US', // Set English as default
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  })

export default i18n 