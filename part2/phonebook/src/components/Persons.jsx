import Person from "./Person"
import SearchFilter from "./Filter"

const Persons = ({ persons, filterValue, handleDeleteButton }) => {


   const filteredArray = persons.filter(p => {
      console.log("entry is ", p.name)

      return p.name.toLowerCase().includes(filterValue.toLowerCase())
   })

   return filteredArray.map(person => <Person person={person} key={person.id} handleDeleteButton={handleDeleteButton}></Person>)
}




export default Persons