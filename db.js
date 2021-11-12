const mongoose = require('mongoose')
const {db} = require('./config.js')

exports.connect = async () => {
  try {
    await mongoose.connect(`${db.url}/${db.db}`)
    console.log(`[Mongoose] MongoDB connected`)
  } catch (e) {
    console.log(`[Mongoose] MongoDB connection ERROR`)
  } 
}
