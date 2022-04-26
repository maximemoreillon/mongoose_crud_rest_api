const Item = require('../models/item.js')

exports.create_item = async (req, res, next) => {
  
  try {
    const properties = req.body
    const new_item = await Item.create(properties)
    res.send(new_item)
  } 
  catch (error) {
    next(error)
  }
  
}

exports.read_item = async (req, res, next) => {

  try {
    const {item_id} = req.params
    const item = await Item.findById(item_id)
    res.send(item)
  } 
  catch (error) {
    next(error)
  }

}

exports.read_items = async (req, res, next) => {
  try {

    const {
      limit = 100,
      skip = 0,
    } = req.query

    const items = await Item
      .find({})
      .skip(Number(skip))
      .limit(Number(limit))

    res.send(items)
  } 
  catch (error) {
    next(error)
  }
}


exports.update_item = async (req, res, next) => {

  try {
    const {item_id} = req.params
    const new_properties = req.body

    const reult = await Item.updateOne({_id: item_id}, new_properties)

    res.send(reult)
  } 
  catch (error) {
    next(error)
  }
}

exports.delete_item = async (req, res, next) => {

  try {
    const {item_id} = req.params

    const result = await Item.deleteOne({_id: item_id})

    res.send(result)
  } 
  catch (error) {
    next(error)
  }

}

