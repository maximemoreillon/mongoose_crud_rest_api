const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const {connect: db_connect} = require('./db.js')
const movies_router = require('./routes/movies.js')
const persons_router = require('./routes/persons.js')


dotenv.config() // Read .env file

const {
  EXPRESS_PORT = 80
} = process.env

db_connect()

// Create an app
const app = express()

app.use(cors()) // Allow cross-origin
app.use(express.json()) // Enable using JSON in request body

// Root route
app.get('/', (req, res) => {
  res.send({application_name: 'MEVN CRUD back-end'})
})

// Routes related to items in separate file
app.use('/movies', movies_router)
app.use('/persons', persons_router)

// Listen on designated port
app.listen(EXPRESS_PORT, () => {
  console.log(`[Express] App listening on port ${EXPRESS_PORT}`)
})
