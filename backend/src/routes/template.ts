import { Router } from 'express'
import { getTemplates } from '../controllers/template'

const router = Router()

router.get('/', getTemplates)

export default router 