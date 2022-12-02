const { Router } = require('express')
const {
  read_person,
  read_persons,
  create_person,
  delete_person,
  update_person,
} = require('../controllers/persons.js')

const router = Router()

router.route('/')
  .get(read_persons)
  .post(create_person)

router.route('/:_id')
  .get(read_person)
  .patch(update_person)
  .delete(delete_person)

module.exports = router
