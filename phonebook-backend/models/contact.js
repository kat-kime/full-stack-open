const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

// connect the db
mongoose.set('strictQuery', false);
mongoose.connect(url, { family: 4 })
  .then(result => console.log('Connected to MongoDB'))
  .catch(error => console.log('Error connecting to MongoDB:', error))

// set the schema
const schema = mongoose.Schema({
  name: String,
  number: String
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', schema)