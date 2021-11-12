const Item = require('../models/item.js')
const { error_handling } = require('../utils.js')

exports.read_items = async (req, res) => {
  const query = {}
  const items = await Item.find(query)
  res.send(items)
  console.log(`[Mongoose] Items queried`)
}

exports.create_item = async (req, res) => {
  const properties = req.body
  const item = await Item.create(properties)
  res.send(item)
  console.log(`[Mongoose] Item ${item._id} created`)

}

exports.read_item = async (req, res) => {
  const {_id} = req.params
  const item = await Item.findOne({_id})
  res.send(item)
}

exports.update_item = async (req, res) => {
  res.status(501).send('Not implemented')
}

exports.delete_item = async (req, res) => {
  const {_id} = req.params
  const result = await Item.findOneAndDelete({_id})
  res.send(result)
}
