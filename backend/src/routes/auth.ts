import { Router } from 'express'
import { register, login, emailLogin, verifyEmailLogin } from '../controllers/auth'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/email-login', emailLogin)
router.post('/verify-email-login', verifyEmailLogin)

export default router 