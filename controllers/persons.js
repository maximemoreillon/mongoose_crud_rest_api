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

    const { skip = 0, limit = 10 } = req.query

    
    const items = await Person
      .find(query)
      .skip(Number(skip))
      .limit(Math.max(Number(limit), 0))
    
    const total = await Person.countDocuments(query)

    const response = { total, skip, limit, items }

    console.log(`[Mongoose] Persons queried`)

    res.send(response)
  }
  catch (error) {
    next(error)
  }

}



exports.read_person = async (req, res, next) => {
  try {
    const {_id} = req.params
    const person = await Person.findOne({_id})
    if(!person) return res.status(404).send(`Person ${_id} not found`)
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
    const person = await Person.findOneAndUpdate({_id},properties)
    if(!person) return res.status(404).send(`Person ${_id} not found`)
    console.log(`[Mongoose] Person ${_id} updated`)
    res.send(person)
  }
  catch (error) {
    next(error)
  }

}

exports.delete_person = async (req, res, next) => {
  try {
    const {_id} = req.params
    const person = await Person.findOneAndDelete({_id})
    if(!person) return res.status(404).send(`Person ${_id} not found`)
    console.log(`[Mongoose] Person ${_id} deleted`)
    res.send(person)
  }
  catch (error) {
    next(error)
  }

}
