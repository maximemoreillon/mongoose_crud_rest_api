const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: String,
  age: Number,
  // Note: No ref to movies. See https://mongoosejs.com/docs/populate.html#refs-to-children
})

const Person = model('Person', schema)

module.exports = Person
