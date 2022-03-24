const { Router } = require('express')
const {
  read_movie,
  read_movies,
  create_movie,
  delete_movie,
  update_movie,
} = require('../controllers/movies.js')

const router = Router()

// /movies routes
router.route('/')
  .get(read_movies)
  .post(create_movie)

router.route('/:_id')
  .get(read_movie)
  .patch(update_movie)
  .delete(delete_movie)

module.exports = router
