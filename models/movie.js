const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  title: String,
  director: {
    type: Types.ObjectId,
    ref: 'Person'
  },
})

const Movie = model('Movie', schema)

module.exports = Movie