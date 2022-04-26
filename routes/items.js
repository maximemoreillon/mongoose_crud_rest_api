const express = require('express')
const {
  create_item,
  read_item,
  read_items,
  update_item,
  delete_item,
} = require('../controllers/items.js')

const router = express.Router()

router.route('/')
  .post(create_item)
  .get(read_items)

router.route('/:item_id')
  .get(read_item)
  .patch(update_item)
  .put(update_item)
  .delete(delete_item)


module.exports = router
