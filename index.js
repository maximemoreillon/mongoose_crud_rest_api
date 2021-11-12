const express = require('express')
const cors = require('cors')
const {express_port} = require('./config.js')
const item_router = require('./routes/items.js')
const {connect: db_connect} = require('./db.js')


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
app.use('/items', item_router)

// Listen on designated port
app.listen(express_port, () => {
  console.log(`[Express] App listening on port ${express_port}`)
})
