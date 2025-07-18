import { Router } from 'express'
import { aiWrite, analyzeResume } from '../controllers/ai'
import { authMiddleware } from '../middlewares/auth'

const router = Router()

router.post('/write', authMiddleware, aiWrite)
router.post('/analyze', authMiddleware, analyzeResume)

export default router 