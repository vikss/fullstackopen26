import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import axios from 'axios'
import phoneSVC from './services/phone.js'
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setNewFilterValue] = useState('')
  const [notification, setNewNotification] = useState('')

  useEffect(() => {
    console.log("in the useffect hook")

    phoneSVC.getAll().then(response => {
      console.log(response.data)
      setPersons(response.data)
    })




  }, [])

  const handleNameChange = (event) => {

    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {

    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {

    console.log("value in the search field is ", event.target.value)
    setNewFilterValue(event.target.value)
  }
  const handleDeleteButton = (event) => {
    event.preventDefault()
    const id = event.target.value
    console.log("Deleting this entry with id  ", id)
    phoneSVC.deleteEntry(id).then(response => {
      console.log("Deleted this entry  ", response.data)

      setPersons(persons.filter(person => person.id !== id))

    }


    )


  }
  const handleButtonSubmit = (event) => {
    event.preventDefault()
    const oldEntry = persons.find(person => person.name.toLowerCase() === newName.toLocaleLowerCase())

    if (oldEntry) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPhonebookEntry = { ...oldEntry, number: newNumber }
        console.log('modified entry is ', updatedPhonebookEntry)
        phoneSVC.updateEntry(oldEntry.id, updatedPhonebookEntry).then(response => {
          console.log("updated entry is ", response.data)

          const newArray = persons.map(person => {
            return person.name.toLowerCase() !== response.data.name.toLowerCase() ? person : response.data
          })
          console.log("new array is ", newArray)
          setPersons(newArray)
        }).catch(error => {

          console.log(`Information of ${newName} has already been removed from server`)
          setNewNotification(`Information of ${newName} has already been removed from server`)
          setTimeout(()=>setNewNotification(''), 5000)
          console.log(error)

        })


      }
      else {

        console.log("user chose not to modify the entry")
      }

    }

    else {
      console.log("name to be added to the phonebook is ", newName)
      const newObj = { name: newName, number: newNumber }
      console.log("posting ", newObj, " to the server")
      phoneSVC.create(newObj).then(response => {

        console.log("The response of the post request is ", response)
        setPersons(persons.concat(response.data))
        setNewNotification(`Added ${newName}`)
        setTimeout(() => setNewNotification(''), 5000)

      })

    }
    console.log("clearing the input field")
    setNewName('')
    setNewNumber('')


  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}></Notification>
      <Filter value={filterValue} handleFilterChange={handleFilterChange}></Filter>
      <h3>Add a new</h3>

      <PersonForm name={newName} number={newNumber} handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} handleButtonSubmit={handleButtonSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterValue} handleDeleteButton={handleDeleteButton}></Persons>
    </div>
  )
}


export default App
