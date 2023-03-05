const Person = require("../models/person.js")
const createHttpError = require("http-errors")

exports.create_person = async (req, res) => {
  const properties = req.body
  const person = await Person.create(properties)
  console.log(`[Mongoose] Person ${person._id} created`)
  res.send(person)
}

exports.read_persons = async (req, res) => {
  const { skip = 0, limit = 10, sort = "_id", order = 1, ...query } = req.query

  const items = await Person.find(query)
    .sort({ [sort]: order })
    .skip(Number(skip))
    .limit(Math.max(Number(limit), 0))

  const total = await Person.countDocuments(query)

  const response = { total, skip, limit, items }

  console.log(`[Mongoose] Persons queried`)

  res.send(response)
}

exports.read_person = async (req, res) => {
  const { _id } = req.params
  const person = await Person.findOne({ _id })

  if (!person) throw createHttpError(404, `Person ${_id} not found`)

  console.log(`[Mongoose] Person ${_id} queried`)
  res.send(person)
}

exports.update_person = async (req, res) => {
  const { _id } = req.params
  const properties = req.body
  const updatedPerson = await Person.findOneAndUpdate({ _id }, properties, {
    new: true,
  })

  if (!updatedPerson) throw createHttpError(404, `Person ${_id} not found`)

  console.log(`[Mongoose] Person ${_id} updated`)
  res.send(updatedPerson)
}

exports.delete_person = async (req, res) => {
  const { _id } = req.params
  const person = await Person.findOneAndDelete({ _id })

  if (!person) throw createHttpError(404, `Person ${_id} not found`)

  console.log(`[Mongoose] Person ${_id} deleted`)
  res.send(person)
}
