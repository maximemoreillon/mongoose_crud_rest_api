const express = require('express')
const controller = require('../controllers/items.js')

const router = express.Router()



router.route('/')
  .post(controller.create_item)
  .get(controller.read_all_items)

router.route('/new')
  .get(controller.create_item)


router.route('/:item_id')
  .get(controller.read_item)
  .delete(controller.delete_item)
  .put(controller.update_item)


router.route('/:item_id/delete')
  .get(controller.delete_item)

router.route('/:item_id/update')
  .get(controller.update_item)

module.exports = router
