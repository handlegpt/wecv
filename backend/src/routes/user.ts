import { Router } from 'express'
import { getSettings, updateSettings, changePassword } from '../controllers/user'
import { authMiddleware } from '../middlewares/auth'

const router = Router()

router.use(authMiddleware)

router.get('/settings', getSettings)
router.put('/settings', updateSettings)
router.put('/password', changePassword)

export default router 