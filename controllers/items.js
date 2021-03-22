const Item = require('../models/item.js')

exports.create_item = (req, res) => {
  const {title, description} = req.body || req.query

  if(!title || !description) {
    return res.status(400).send(`Missing name or description`)
  }

  const new_item = new Item({title, description})
  new_item.save()
  .then(() => {
    console.log(`New item inserted`)
    res.send('OK')
  })
  .catch(error => {
    console.log(error)
    res.status(500).send('Error')
  })
}

exports.read_item = (req, res) => {
  const {item_id} = req.params
  if(!item_id) return res.status(400).send(`Item ID not defined`)

  Item.findById(item_id)
  .then(item => {
    res.send(item)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })
}

exports.update_item = (req, res) => {
  const {item_id} = req.params
  if(!item_id) return res.status(400).send(`Item ID not defined`)

  const new_properties = req.body

  Item.updateOne({_id: item_id}, new_properties)
  .then(() => {
    res.send('Update OK')
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })
}

exports.delete_item = (req, res) => {
  const {item_id} = req.params
  if(!item_id) return res.status(400).send(`Item ID not defined`)

  Item.deleteOne({_id: item_id})
  .then(() => {
    res.send('OK')
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })
}

exports.read_all_items = (req, res) => {
  Item.find({})
  .then(items => {
    res.send(items)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })
}
