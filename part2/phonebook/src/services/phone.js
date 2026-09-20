import axios from 'axios'

const URL = "http://localhost:3001/persons"

const getAll = () => {
     
    console.log("Fetching all the phonebook entries from ",URL)
    //console.log(axios.get(URL).then(res=>console.log(res)))
    return axios.get(URL)

}
const create = (newObject) => {

    return axios.post(URL, newObject)

}
const deleteEntry = (id) => {

    return axios.delete(`${URL}/${id}`)

}
const updateEntry = (id, updatedEntry) => {
    console.log("id is ", id)

    return axios.put(`${URL}/${id}`, updatedEntry)
}

export default { getAll, create, deleteEntry, updateEntry }