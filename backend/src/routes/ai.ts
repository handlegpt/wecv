import { Router } from 'express'
import { aiWrite, analyzeResume, translateContent } from '../controllers/ai'
import { authMiddleware } from '../middlewares/auth'

const router = Router()

router.post('/write', authMiddleware, aiWrite)
router.post('/analyze', authMiddleware, analyzeResume)
router.post('/translate', authMiddleware, translateContent)

export default router 