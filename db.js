const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const {MONGODB_URL, MONGODB_DB} = process.env

exports.connect = async () => {
  try {
    await mongoose.connect(`${MONGODB_URL}/${MONGODB_DB}`)
    console.log(`[Mongoose] MongoDB connected`)
  } catch (e) {
    console.log(`[Mongoose] MongoDB connection ERROR`)
  }
}
