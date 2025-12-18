import { useState } from 'react'

const Entry = ({ entry }) => {
  return (
    <>
    <li>{entry.name}: {entry.phone}</li>
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
      <form onSubmit={() => event.preventDefault()}>
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
  persons
}) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        { showAll 
          ? persons.map( person => 
            <Entry key={person.id} entry={person} /> 
          ) 
          : filteredPersons.map( 
            person => <Entry key={person.id} entry={person} />
          )
        }
      </ul>
    </>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([{
    id: 0,
    name: 'Arto Hellas',
    phone: '867-5309'
  }])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearchEntry, setNewSearchEntry] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [showAll, setShowAll] = useState(true)
  

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

  const addNewEntry = () => {
    if (isNewNamePresent(newName)) {
      alert(`${newName} is already in the phone book`)
      setNewName('')

    } else {
      const newEntry = { 
        id: persons.length, 
        name: newName, 
        phone: newPhone 
      }

      setPersons(persons.concat(newEntry))
      setNewName('')
      setNewPhone('')
    }
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
      />
    </>
  )
}

export default App