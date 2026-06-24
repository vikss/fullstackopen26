import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setNewFilterValue] = useState('')

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
  const handleButtonSubmit = (event) => {
    event.preventDefault()
    const nameExists = persons.find(person => person.name.toLowerCase() === newName.toLocaleLowerCase())
    if (nameExists)
      window.alert(`${newName} is already added to the phonebook`)

    else {
      console.log("name to be added to the phonebook is ", newName)
      const newObj = { name: newName, number: newNumber }
      setPersons(persons.concat(newObj))
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
      <Persons persons={persons} filterValue={filterValue}></Persons>
    </div>
  )
}


export default App
