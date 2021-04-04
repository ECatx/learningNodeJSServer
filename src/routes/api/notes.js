import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ msg: 'Get all notes' })
})

router.post('/', (req, res) => {
  res.json({ msg: 'create a notes' })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  res.json({ msg: `Getting note ${id}` })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  res.json({ msg: `Updating note ${id}` })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.json({ msg: `Deleting note ${id}` })
})

export default router
