require('dotenv').config()

const express = require('express')
const app = express()
const Note = require('./models/note')

app.use(express.json())
app.use(express.static('dist'))

const PORT = process.env.PORT || 3001

app.get('/', (request, response) => {
  response.send('<h1>Hello, world</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  return Note.findById(id).then(note => response.json(note))
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  return note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.put('/api/notes/:id', (request, response) => {
  const body = request.body
  console.log('received note:', body)

  if (!body.content || !body.id) {
    return response.status(400).json({
      error: 'missing content or id'
    })
  }

  const newNote = {
    id: body.id,
    content: body.content,
    important: body.important || false
  }

  notes = notes.map(note => note.id === newNote.id 
    ? newNote 
    : note
  )

  response.json(newNote)
})

app.listen(PORT, () => {
  console.log(`Server running port on ${PORT}`)
})