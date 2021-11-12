const { Router } = require('express')
const {
  read_item,
  read_items,
  create_item,
  delete_item,
  update_item,
} = require('../controllers/items.js')

const router = Router()

// /items routes
router.route('/')
  .get(read_items)
  .post(create_item)

router.route('/:_id')
  .get(read_item)
  .patch(update_item)
  .delete(delete_item)

module.exports = router
