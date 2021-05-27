const Item = require('../models/item.js')

exports.create = (req, res) => {
  const {title, description} = req.body

  console.log(req.body)

  if(!title || !description) {
    return res.status(400).send(`Missing title or description`)
  }

  const new_item = new Item({title, description})
  new_item.save()
  .then((result) => {
    console.log(`[Mongoose] New item inserted`)
    res.send(result)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send('Error')
  })
}

exports.read = (req, res) => {
  const {item_id} = req.params
  if(!item_id) return res.status(400).send(`Item ID not defined`)

  Item.findById(item_id)
  .then(item => {
    console.log(`[Mongoose] Item ${item_id} queried`)
    res.send(item)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })
}

exports.update = (req, res) => {
  const {item_id} = req.params
  if(!item_id) return res.status(400).send(`Item ID not defined`)

  const new_properties = req.body

  Item.updateOne({_id: item_id}, new_properties)
  .then((result) => {
    console.log(`[Mongoose] Item ${item_id} updated`)
    res.send(result)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })
}

exports.delete = (req, res) => {
  const {item_id} = req.params
  if(!item_id) return res.status(400).send(`Item ID not defined`)

  Item.deleteOne({_id: item_id})
  .then(() => {
    console.log(`[Mongoose] Item ${item_id} deleted`)
    res.send('OK')
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })
}

exports.read_all = (req, res) => {
  Item.find({})
  .then(items => {
    console.log(`[Mongoose] Items queried`)
    res.send(items)
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error)
  })
}
