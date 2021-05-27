const express = require('express')
const controller = require('../controllers/items.js')

const router = express.Router()



router.route('/')
  .post(controller.create)
  .get(controller.read_all)

router.route('/:item_id')
  .get(controller.read)
  .delete(controller.delete)
  .put(controller.update)


module.exports = router
