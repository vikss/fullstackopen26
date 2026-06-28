const Person = ({ person, handleDeleteButton }) => {

   console.log("Person's id is ", person.id)

   return <li>{person.name} {person.number} <button type="submit" onClick={handleDeleteButton} value={person.id}>delete</button></li>
}



export default Person