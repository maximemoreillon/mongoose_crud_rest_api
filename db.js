const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

// Read environment variables
const {
  MONGODB_URL = 'mongodb://localhost',
  MONGODB_DB = 'mevn_crud'
} = process.env

const connect = async () => {
  try {
    const connection_url = `${MONGODB_URL}/${MONGODB_DB}`
    console.log(`[Mongoose] Connecting to ${connection_url}`)
    
    await mongoose.connect(connection_url)
    console.log(`[Mongoose] MongoDB connected`)
  }
  catch (e) {
    console.log(`[Mongoose] MongoDB connection ERROR`)
    setTimeout(connect, 5000)
  }
}

exports.connect = connect