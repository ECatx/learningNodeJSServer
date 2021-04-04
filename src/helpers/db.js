import { nanoid } from 'nanoid'

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
  const id = nanoid()
  notes.push({ id, ...n })
  return getByID(id)
}

export const removeByID = (id) => {
  notes = notes.filter((n) => n.id !== id)
  return notes
}

export const update = (id, n) => {
  let dbNote = getByID(id)
  if (dbNote) {
    dbNote = { ...dbNote, ...n }
    removeByID(id)
    add(dbNote)
    return dbNote
  }
  return null
}
