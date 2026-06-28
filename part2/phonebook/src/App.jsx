import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import axios from 'axios'
import phoneSVC from './services/phone.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setNewFilterValue] = useState('')

  useEffect(() => {
    console.log("in the useffect hook")

    phoneSVC.getAll().then(response => {
      console.log(response.data)
      setPersons(response.data)
    })




  }, [])

  const handleNameChange = (event) => {

    console.log("value in the name input field is ", event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {

    console.log("value in the number input field is ", event.target.value)
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
    const nameExists = persons.find(person => person.name.toLowerCase() === newName.toLocaleLowerCase())
    if (nameExists)
      window.alert(`${newName} is already added to the phonebook`)

    else {
      console.log("name to be added to the phonebook is ", newName)
      const newObj = { name: newName, number: newNumber }
      console.log("posting ", newObj, " to the server")
      phoneSVC.create(newObj).then(response => {

        console.log("The response of the post request is ", response)
        setPersons(persons.concat(response.data))

      })

    }
    console.log("clearing the input field")
    setNewName('')
    setNewNumber('')


  }

  return (
    <div>
      <h2>Phonebook</h2>
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
