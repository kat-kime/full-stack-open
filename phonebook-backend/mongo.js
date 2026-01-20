import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log('invalid num args; usage: node mongo.js password name number')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]  

const DB_URL = `mongodb+srv://katckime_db_user:${password}@cluster0.ykobwup.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(DB_URL, { family: 4 })

// define schema
const numberSchema = mongoose.Schema({
  name: String,
  number: String
})

const Number = mongoose.model('Number', numberSchema)

// define getAll
const getAll = () => {
  return Number.find({})
}

// define save
const create = ( newName, newNumber) => {
  const payload = Number({
    name: newName,
    number: newNumber
  })

  return payload.save()
    .then( result => console.log(`added ${newName} number ${newNumber} to phonebook`))
    .catch(err => console.error(err))
}

if (process.argv.length < 5) {
  await getAll().then( numbers => {
    console.log('phonebook:')
    numbers.forEach(number => console.log(`${number.name} ${number.number}`)) 
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  await create(name, number)
  mongoose.connection.close()
}
