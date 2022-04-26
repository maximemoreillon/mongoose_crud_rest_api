const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

// Mongoose connection
const mongoose_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}


const {
    MONGODB_DB = 'mongoose_crud_api',
    MONGODB_URL = 'mongodb://localhost',
} = process.env

const connection_string = `${MONGODB_URL}/${MONGODB_DB}`


const connect = () => {
    console.log(`MongoDB connecting to ${connection_string}`);
    mongoose.connect(connection_string, mongoose_options)

    const db = mongoose.connection
    db.on('error', console.error.bind(console, '[Mongoose] connection error:'))
    db.once('open', () => { console.log('[Mongoose] Connected') })
}



exports.db = MONGODB_DB
exports.url = MONGODB_URL
exports.connect = connect
