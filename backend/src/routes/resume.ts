import { Router } from 'express'
import { getAllResumes, getResume, createResume, updateResume, deleteResume, exportResume, shareResume } from '../controllers/resume'
import { authMiddleware } from '../middlewares/auth'
import { checkPlanLimit, requireFeature, checkResumeLimit } from '../middlewares/plan'

const router = Router()

// Apply plan check to all routes
router.use(authMiddleware, checkPlanLimit)

router.get('/', getAllResumes)
router.get('/:id', getResume)
router.post('/', checkResumeLimit, createResume)
router.put('/:id', updateResume)
router.delete('/:id', deleteResume)
router.post('/:id/export', requireFeature('export'), exportResume)
router.post('/:id/share', requireFeature('share'), shareResume)

export default router 