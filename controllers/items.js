const Item = require('../models/item.js')
const { error_handling } = require('../utils.js')

exports.read_items = async (req, res) => {
  try {
    const query = {}
    const items = await Item.find(query)
    res.send(items)
    console.log(`[Mongoose] Items queried`)
  } catch (error) {
    error_handling(error,res)
  }

}

exports.create_item = async (req, res) => {
  try {
    const properties = req.body
    const item = await Item.create(properties)
    res.send(item)
    console.log(`[Mongoose] Item ${item._id} created`)
  } catch (error) {
    error_handling(error,res)
  }


}

exports.read_item = async (req, res) => {
  try {
    const {_id} = req.params
    const item = await Item.findOne({_id})
    res.send(item)
    console.log(`[Mongoose] Item ${_id} queried`)
  } catch (error) {
    error_handling(error,res)
  }

}

exports.update_item = async (req, res) => {
  try {
    const {_id} = req.params
    const properties = req.body
    const result = await Item.findOneAndUpdate({_id},properties)
    res.send(result)
    console.log(`[Mongoose] Item ${_id} updated`)
  } catch (error) {
    error_handling(error,res)
  }

}

exports.delete_item = async (req, res) => {
  try {
    const {_id} = req.params
    const result = await Item.findOneAndDelete({_id})
    res.send(result)
  } catch (error) {
    error_handling(error,res)
  }

}
