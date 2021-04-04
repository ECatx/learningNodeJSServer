import { nanoid } from 'nanoid'

import Joi from 'joi'
import logger from './logger'

const notesSchema = Joi.object({
  title: Joi.string().required().min(2).max(30),
  content: Joi.string().required().min(5).max(50),
})

let notes = []

const note = {
  id: 'randomid',
  title: 'note title.',
  content: 'note content',
}

notes.push(note)

export const getAll = () => notes

export const getByID = (id) => notes.find((n) => n.id === id)

export const add = (n) => {
  const { error } = notesSchema.validate(n)
  if (error) {
    logger.error(error)
    return { error: error.details[0].message }
  }
  const id = nanoid()
  notes.push({ id, ...n })
  return getByID(id)
}

export const removeByID = (id) => {
  notes = notes.filter((n) => n.id !== id)
  return notes
}

export const update = (id, n) => {
  const { error } = notesSchema.validate(n)
  if (error) {
    logger.error(error)
    return { error: error.details[0].message }
  }
  let dbNote = getByID(id)
  if (dbNote) {
    dbNote = { ...dbNote, ...n }
    removeByID(id)
    add(dbNote)
    return dbNote
  }
  return null
}
