import express from 'express'
import morgan from 'morgan'

const app = express()
app.use(express.json())

const PORT = 3001

morgan.token('body', (request, response) => {
  if (request.body) {
    const body = request.body
    return `{ name: ${body.name}, number: ${body.number}}`
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let contacts = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "le"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
  const maxId = contacts.length > 0
    ? Math.max(...contacts.map(n => Number(n.id))) 
    : 0

  return String(maxId)
}

app.delete('/api/contacts/:id', (request, response) => {
  const id = request.params.id
  contacts = contacts.filter(contact => contact.id !== String(id))

  response.status(204).end()
})

app.get('/', (request, response) => {
  morgan(':method "url :status :res[content-length] - :response-time ms')
  response.send('<h1>Hello, world!</h1>')
})

app.get('/api/contacts', (request, response) => {
  response.json(contacts)
})

app.get('/info', (request, response) => {
  const message = `<p>Phonebook has info for ${contacts.length} people<p><p>${new Date(Date.now()).toString()}<p>`
  response.send(message)
})

app.get('/api/contacts/:id', (request, response) => {
  const id = request.params.id
  const index = contacts.findIndex(contact => contact.id === String(id))
  if (index > -1) {
    response.json(contacts[index])
  } else {
    response.status(404).end()
  }
})

app.post('/api/contacts', (request, response) => {
  morgan('tiny')

  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const contact = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  contacts = contacts.concat(contact)

  response.json()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})