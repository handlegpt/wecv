import { Router } from 'express'
import { getAllResumes, getResume, createResume, updateResume, deleteResume, exportResume, shareResume } from '../controllers/resume'
import { authMiddleware } from '../middlewares/auth'

const router = Router()

router.get('/', authMiddleware, getAllResumes)
router.get('/:id', authMiddleware, getResume)
router.post('/', authMiddleware, createResume)
router.put('/:id', authMiddleware, updateResume)
router.delete('/:id', authMiddleware, deleteResume)
router.post('/:id/export', authMiddleware, exportResume)
router.post('/:id/share', authMiddleware, shareResume)

export default router 