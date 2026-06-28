import axios from 'axios'

const URL = "http://localhost:3001/persons"

const getAll = () => {

    return axios.get(URL)

}
const create = (newObject) => {

    return axios.post(URL, newObject)

}
const deleteEntry = (id) => {

    return axios.delete(`http://localhost:3001/persons/${id}`)

}

export default { getAll, create, deleteEntry }