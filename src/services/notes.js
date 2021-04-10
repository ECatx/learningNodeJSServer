import Joi from 'joi'
import db from '../helpers/db'
import logger from '../helpers/logger'

const notesSchema = Joi.object({
  title: Joi.string().required().min(2).max(30),
  content: Joi.string().required().min(5).max(50),
})

export const getAll = async () => {
  const notes = await db('notes')
  return notes
}

export const getByID = async (id) => {
  const note = await db('notes').where({ id }).first()
  if (note) return note
  return null
}

export const add = async (n) => {
  const { error } = notesSchema.validate(n)
  if (error) {
    logger.error(error)
    return { error: error.details[0].message }
  }
  const id = await db('notes').insert({
    ...n,
    created_at: new Date().toLocaleString(),
    updated_at: new Date().toLocaleString(),
  })
  const note = await getByID(id[0])
  return note
}

export const removeByID = async (id) => {
  await db('notes').where({ id }).del()
  const notes = await getAll()
  return notes
}

export const update = async (id, n) => {
  const { error } = notesSchema.validate(n)
  if (error) {
    logger.error(error)
    return { error: error.details[0].message }
  }
  let note = await getByID(id)
  if (note) {
    await db('notes').where({ id }).update({
      title: n.title,
      content: n.content,
      updated_at: new Date().toLocaleString(),
    })
    note = await getByID(id)
    return note
  }
  return null
}
