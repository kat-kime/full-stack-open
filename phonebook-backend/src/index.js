require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const Contact = require('../models/contact')
const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3001

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  }

  next(error)
}

morgan.token('body', (request, response) => {
  if (request.body) {
    const body = request.body
    return `{ name: ${body.name}, number: ${body.number}}`
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.delete('/api/contacts/:id', (request, response, next) => {
  const id = request.params.id
  Contact.findByIdAndDelete(id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
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

app.get('/api/contacts/:id', (request, response, next) => {
  const id = request.params.id
  return Contact.findById(id)
    .then(contact => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  }
)

app.post('/api/contacts', (request, response) => {
  morgan('tiny')
  const { name, number } = request.body
  Contact.find({ name: name })
    .then(contact => {
      if (contact) {
        console.log('returned contact:', contact)
        contact.number = number
        return contact.save().then(updatedContact => response.json(updatedContact))
      }
    })

  const contact = new Contact({
    name: name,
    number: number
  })

  return contact.save()
    .then(savedContact => response.json(savedContact))
})

app.put('/api/contacts/:id', (request, response, next) => {
  const { name, number } = request.body

  Contact.findById(request.params.id)
    .then(contact => {
      if (!contact) {
        return response.status(404).end()
      }

      contact.name = name
      contact.number = number

      return contact.save().then(savedContact => response.json(savedContact))
    })
    .catch(error => next(error))
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})