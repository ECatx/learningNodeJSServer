import { Router } from 'express'

import * as noteService from '../../services/notes'
import logger from '../../helpers/logger'

const router = Router()

router.get('/', async (req, res) => {
  const notes = await noteService.getAll()
  res.send(notes)
})

router.post('/', (req, res) => {
  const { note: newNote } = req.body
  if (newNote) {
    const note = noteService.add(newNote)
    if (note.error) {
      res.status(400)
    }
    res.send(note)
  } else {
    res.status(400).send({ msg: 'Bad Status' })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const note = await noteService.getByID(id)
  if (note) {
    res.send(note)
  } else {
    logger.warn(`Note ${id} not found`)
    res.status(404).send({})
  }
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { note: updatedNote } = req.body
  const response = noteService.update(id, updatedNote)
  if (response.error) {
    res.status(400)
  }
  res.send(response)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.send(noteService.removeByID(id))
})

export default router
