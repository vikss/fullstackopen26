const Person = ({ person, handleDeleteButton }) => {


   return <li>{person.name} {person.number} <button type="submit" onClick={handleDeleteButton} value={person.id}>delete</button></li>
}



export default Person