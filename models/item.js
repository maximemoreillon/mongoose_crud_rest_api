const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
