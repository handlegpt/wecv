import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '../middlewares/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Get supported languages
router.get('/languages', async (req, res) => {
  try {
    const languages = await prisma.language.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    })
    
    res.json(languages)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch languages' })
  }
})

// Get resume in specific language
router.get('/resume/:id/:language', authMiddleware, async (req, res) => {
  try {
    const { id, language } = req.params
    const userId = req.userId

    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId
      }
    })

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' })
    }

    // If the requested language is the same as the resume's language
    if (resume.language === language) {
      return res.json(resume)
    }

    // If translations exist, return the translation
    if (resume.translations && typeof resume.translations === 'object') {
      const translations = resume.translations as Record<string, any>
      if (translations[language]) {
        return res.json({
          ...resume,
          content: translations[language]
        })
      }
    }

    // Return the original resume if no translation is available
    res.json(resume)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resume' })
  }
})

// Update resume with translations
router.put('/resume/:id/translations', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params
    const { translations } = req.body
    const userId = req.userId

    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId
      }
    })

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' })
    }

    const updatedResume = await prisma.resume.update({
      where: { id },
      data: {
        translations: {
          ...resume.translations,
          ...translations
        }
      }
    })

    res.json(updatedResume)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update resume translations' })
  }
})

// Create resume in multiple languages
router.post('/resume/multilanguage', authMiddleware, async (req, res) => {
  try {
    const { title, content, language, translations, templateId } = req.body
    const userId = req.userId

    const resume = await prisma.resume.create({
      data: {
        title,
        content,
        language,
        translations,
        userId,
        templateId
      }
    })

    res.status(201).json(resume)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create multilanguage resume' })
  }
})

// Get user's preferred language
router.get('/user/language', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { preferredLanguage: true }
    })

    res.json({ language: user?.preferredLanguage || 'en-US' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user language preference' })
  }
})

// Update user's preferred language
router.put('/user/language', authMiddleware, async (req, res) => {
  try {
    const { language } = req.body
    const userId = req.userId

    const user = await prisma.user.update({
      where: { id: userId },
      data: { preferredLanguage: language }
    })

    res.json({ language: user.preferredLanguage })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user language preference' })
  }
})

// Initialize supported languages
router.post('/init-languages', async (req, res) => {
  try {
    const languages = [
      { code: 'en-US', name: 'English', nativeName: 'English', flag: '🇺🇸' },
      { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '中文 (简体)', flag: '🇨🇳' },
      { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '中文 (繁體)', flag: '🇹🇼' },
      { code: 'ja-JP', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
      { code: 'es-ES', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
      { code: 'fr-FR', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
      { code: 'de-DE', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' }
    ]

    for (const language of languages) {
      await prisma.language.upsert({
        where: { code: language.code },
        update: language,
        create: language
      })
    }

    res.json({ message: 'Languages initialized successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize languages' })
  }
})

export default router 