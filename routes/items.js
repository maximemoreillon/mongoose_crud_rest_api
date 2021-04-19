const express = require('express')
const controller = require('../controllers/items.js')

const router = express.Router()



router.route('/')
  .post(controller.create_item)
  .get(controller.read_all_items)

router.route('/:item_id')
  .get(controller.read_item)
  .delete(controller.delete_item)
  .put(controller.update_item)


module.exports = router
