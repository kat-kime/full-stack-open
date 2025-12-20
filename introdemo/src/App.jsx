import { useState, useEffect } from 'react'
import contactService from './services/contacts'

const Entry = ({ entry, deleteContact }) => {
  return (
    <>
    <li>{entry.name}: {entry.number}</li>
    <button onClick={() => deleteContact(entry.id)}>delete</button>
    </>
  )
}

const Filter = ({ 
  newSearchEntry, 
  handleSearchChange, 
  findEntry, 
  handleClear 
}) => {
  return (
    <>
      <h2>Find Number</h2>
      <form onSubmit={ event => event.preventDefault()}>
        <div>
          name: <input value={newSearchEntry} onChange={handleSearchChange} />
        </div>
        <div>
          <button onClick={findEntry}>search</button>
          <button onClick={handleClear}>clear</button>
        </div>
      </form>
    </>
  )
}

const AddForm = ({ 
  newName,
  handleNameChange,
  newPhone,
  handlePhoneChange,
  addNewEntry,
  handleClear
}) => {
  return (
    <>
      <h2>Add New Number</h2>
      <form onSubmit={() => event.preventDefault()}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button onClick={addNewEntry}>add</button>
        </div>
        <div>
          <button onClick={handleClear}>clear</button>
        </div>
      </form>
    </>
  )
}

const Numbers = ({
  showAll,
  filteredPersons,
  persons,
  deleteContact
}) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        { showAll 
          ? persons.map( person => 
            <Entry key={person.id} entry={person} deleteContact={deleteContact} /> 
          ) 
          : filteredPersons.map( 
            person => <Entry key={person.id} entry={person} deleteContact={deleteContact} />
          )
        }
      </ul>
    </>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearchEntry, setNewSearchEntry] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    contactService
      .getAll()
      .then(contacts => setPersons(contacts))
  }, [])
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearchEntry(event.target.value)
  }

  const handleClear = () => {
    setNewName('')
    setNewPhone('')
    setNewSearchEntry('')
    setShowAll(true)
  }

  const deleteContact = id => {
    const contact = persons.find(person => person.id === id)
    confirm(`Delete ${contact.name}?`)
    contactService.del(id).then(setPersons(persons.filter(person => person.id !== id)))
  }

  const addNewEntry = () => {
    const newEntry = {
      name: newName, 
      number: newPhone
    }

    const existingIndex = persons.findIndex(person => person.name === newName)
    if (existingIndex !== -1) {
      const existingContact = persons[existingIndex]
      if (confirm(`Update number for contact, ${existingContact.name}?`)) {
        contactService
          .update(existingContact.id, newEntry)
          .then(entry => {
            setPersons(persons.map(person => person.id === existingContact.id ? entry : person))
          })
      }
    } else {
      contactService
        .create(newEntry)
        .then(entry => setPersons(persons.concat(entry)))
    }
    
    setNewName('')
    setNewPhone('')
  }

  const findEntry = (event) => {
    event.preventDefault()
    setFilteredPersons(persons.filter( 
      person => person.name.toLowerCase().startsWith(newSearchEntry.toLowerCase()) 
    ))
    setShowAll(false)
  }

  const isNewNamePresent = (name) => {
    const found = persons.findIndex( person => person.name === name )
    return found !== -1
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Filter 
        newSearchEntry={newSearchEntry} 
        handleSearchChange={handleSearchChange} 
        findEntry={findEntry} 
        handleClear={handleClear}
      />
      <AddForm 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newPhone={newPhone} 
        handlePhoneChange={handlePhoneChange} 
        addNewEntry={addNewEntry} 
        handleClear={handleClear} 
      />
      <Numbers 
        showAll={showAll} 
        filteredPersons={filteredPersons} 
        persons={persons} 
        deleteContact={deleteContact}
      />
    </>
  )
}

export default App