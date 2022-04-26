const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const item_router = require('./routes/items.js')
const {connect: db_connect} = require('./db.js')
const {version, author} = require('./package.json')
dotenv.config()

db_connect()

const {APP_PORT = 80} = process.env

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send({
    application_name: 'Mongoose CRUD REST API',
    author,
    version,
  })
})

app.use('/items', item_router)


app.listen(APP_PORT, () => {
  console.log(`App listening on ${APP_PORT}`)
})

exports.app = app
