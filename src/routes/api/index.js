import { Router } from 'express'

import notes from './notes'

const router = Router()

router.get('/', (req, res) => {
  res.json({ msg: 'API EndPoint' })
})

router.use('/notes', notes)
export default router
