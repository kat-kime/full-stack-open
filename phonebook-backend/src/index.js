require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const Contact = require('../models/contact')
const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3001

morgan.token('body', (request, response) => {
  if (request.body) {
    const body = request.body
    return `{ name: ${body.name}, number: ${body.number}}`
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.delete('/api/contacts/:id', (request, response) => {
  const id = request.params.id
  Contact.deleteOne({_id: id})
    .then(result => response.status(204).end())
    .catch(error => console.log('Error deleting contact', error))
})

app.get('/', (request, response) => {
  morgan(':method "url :status :res[content-length] - :response-time ms')
  response.send('<h1>Hello, world!</h1>')
})

app.get('/api/contacts', (request, response) => {
  return Contact.find({})
    .then(contacts => response.json(contacts))
})

app.get('/info', (request, response) => {
  Contact.find({})
    .then(contacts => response.send(`<p>Phonebook has info for ${contacts.length} people<p><p>${new Date(Date.now()).toString()}<p>`))
})

app.get('/api/contacts/:id', (request, response) => {
  const id = request.params.id
  return Contact.findById(id).then(contact => response.json(contact))
})

app.post('/api/contacts', (request, response) => {
  morgan('tiny')

  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number
  })

  return contact.save()
    .then(savedContact => response.json(savedContact))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})