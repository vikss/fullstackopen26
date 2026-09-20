import express from 'express'
import morgan from 'morgan'
import cors from 'cors'



const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
morgan.token('content', (req, res)=>{


     console.log('in the customs token, the value of body is ', req.body)
     return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
let entries = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/api/persons", (req, res) => {

    res.json(entries)


})
app.get("/api/persons/:id", (req, res) => {

    const entryID = req.params.id
    console.log(typeof (entryID))
    let entry = entries.find((entry) => entry.id === entryID)
    if (entry) {
        console.log(entry)
        res.json(entry)
    }

    else {

        res.status(404).end()
    }
})
app.delete(("/api/persons/:id"), (request, response) => {

    const entryID = request.params.id
    console.log(`going to delete the phonebook entry with id ${entryID}`)
    entries = entries.filter(entry => entry.id !== entryID)
    console.log(`phonebook now has the entries ${entries}`)
    response.status(204).end()

})
app.post("/api/persons", (request, response) => {

    const id = String(Math.ceil(Math.random() * 10000))
    let body = request.body
    console.log(body)
    if (body.name && body.number) {

        let nameExists = entries.find(entry => entry.name === body.name)

        if (nameExists) {

            response.status(400).send({ error: 'name must be unique' })
        }
        let newEntry = { name: body.name, number: body.number, id: id }
        console.log(`new phonebook entry is`, newEntry)
        entries.push(newEntry)
        response.json(newEntry)


    }
    else {
        response.status(400).send({ error: 'name or number isn\'t supplied' })

    }




})

app.get("/info", (req, res) => {

    res.send(`<div>
        <div>Phone has info for ${entries.length} people</div>
        <div>${new Date()}</div>
        </div>`)


})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`running the app on port ${PORT}`)

})