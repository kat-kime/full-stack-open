import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Note from './components/Note'
import Notification from './components/Notification'

const API_ENDPOINT = 'http://localhost:3001/notes'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic'
  }

  return (
    <div style={footerStyle}>
      <br />
      <p>Note app, Department of Computer Science, University of Helinski 2025</p>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    console.log('effect')

    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  console.log('render', notes.length, 'notes')

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(updatedNote => setNotes(notes.map(note => 
        note.id === id 
        ? updatedNote
        : note
      )))
      .catch(error => {
        setErrorMessage(`The note, '${note.content}', was already deleted from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const notesToShow = showAll 
    ? notes
    : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService
      .create(noteObject)
      .then(note => {
        setNotes(notes.concat(note))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </>
  )
}

export default App