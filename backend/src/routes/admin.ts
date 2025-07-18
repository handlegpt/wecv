import { Router } from 'express'
import { getStats, getUsers, updateUserRole, deleteUser } from '../controllers/admin'
import { authMiddleware, adminMiddleware } from '../middlewares/auth'

const router = Router()

// 所有路由都需要管理员权限
router.use(authMiddleware)
router.use(adminMiddleware)

router.get('/stats', getStats)
router.get('/users', getUsers)
router.put('/users/:id/role', updateUserRole)
router.delete('/users/:id', deleteUser)

export default router 