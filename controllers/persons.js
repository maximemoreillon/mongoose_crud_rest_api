const Person = require('../models/person.js')

exports.create_person = async (req, res, next) => {
  try {
    const properties = req.body
    const person = await Person.create(properties)
    console.log(`[Mongoose] Person ${person._id} created`)
    res.send(person)
  }
  catch (error) {
    next(error)
  }

}

exports.read_persons = async (req, res, next) => {
  try {
    const query = {}
    const persons = await Person.find(query)
    console.log(`[Mongoose] Persons queried`)
    res.send(persons)
  }
  catch (error) {
    next(error)
  }

}



exports.read_person = async (req, res, next) => {
  try {
    const {_id} = req.params
    const person = await Person.findOne({_id})
    console.log(`[Mongoose] Person ${_id} queried`)
    res.send(person)
  }
  catch (error) {
    next(error)
  }

}

exports.update_person = async (req, res, next) => {
  try {
    const {_id} = req.params
    const properties = req.body
    const result = await Person.findOneAndUpdate({_id},properties)
    console.log(`[Mongoose] Person ${_id} updated`)
    res.send(result)
  }
  catch (error) {
    next(error)
  }

}

exports.delete_person = async (req, res, next) => {
  try {
    const {_id} = req.params
    const result = await Person.findOneAndDelete({_id})
    console.log(`[Mongoose] Person ${_id} deleted`)
    res.send(result)
  }
  catch (error) {
    next(error)
  }

}
