const {Schema, model} = require('mongoose')

const itemSchema = new Schema({
  name: String,
  time: Date,
  value: Number,
})

const Item = model('Item', itemSchema)

module.exports = Item
