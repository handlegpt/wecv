import { Router } from 'express'
import { getUserProfile, updateUserProfile, getUserPlan } from '../controllers/user'
import { authMiddleware } from '../middlewares/auth'
import { checkPlanLimit } from '../middlewares/plan'

const router = Router()

router.use(authMiddleware, checkPlanLimit)

router.get('/profile', getUserProfile)
router.put('/profile', updateUserProfile)
router.get('/plan', getUserPlan)

export default router 