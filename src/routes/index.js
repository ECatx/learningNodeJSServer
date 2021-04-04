import { Router } from 'express'
import root from './root'
import api from './api'

const router = Router()

router.use(root)
router.use('/eric', api)

export default router
