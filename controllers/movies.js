const Movie = require('../models/movie.js')
const createHttpError = require('http-errors')


exports.create_movie = async (req, res, next) => {
  try {
    const properties = req.body
    const movie = await Movie.create(properties)
    console.log(`[Mongoose] Movie ${movie._id} created`)
    res.send(movie)
  }
  catch (error) {
    next(error)
  }

}

exports.read_movies = async (req, res, next) => {
  try {

    const query = {}

    const {
      skip = 0,
      limit = 10,
      sort = '_id',
      order = 1,
    } = req.query

    const items = await Movie
      .find(query)
      .populate('director')
      .sort({ [sort]: order })
      .skip(Number(skip))
      .limit(Math.max(Number(limit), 0))

    const total = await Movie.countDocuments(query)

    const response = { total, skip, limit, items }


    console.log(`[Mongoose] Movies queried`)
    res.send(response)
  }
  catch (error) {
    next(error)
  }

}



exports.read_movie = async (req, res, next) => {
  try {
    const {_id} = req.params
    const movie = await Movie
      .findOne({_id})
      .populate('director')

    // Throw an HTTP 404 if the movie was not found in the DB
    if (!movie) throw createHttpError(404, `Movie ${ _id } not found`) 

    console.log(`[Mongoose] Movie ${_id} queried`)
    res.send(movie)
  }
  catch (error) {
    next(error)
  }

}

exports.update_movie = async (req, res, next) => {
  try {
    const {_id} = req.params
    const properties = req.body
    const movie = await Movie.findOneAndUpdate({_id},properties)

    // Throw an HTTP 404 if the movie was not found in the DB
    if (!movie) throw createHttpError(404, `Movie ${ _id } not found`) 

    console.log(`[Mongoose] Movie ${_id} updated`)
    res.send(movie)
  }
  catch (error) {
    next(error)
  }

}

exports.delete_movie = async (req, res, next) => {
  try {
    const {_id} = req.params
    const result = await Movie.findOneAndDelete({_id})
    console.log(`[Mongoose] Movie ${_id} deleted`)

    res.send(result)
  }
  catch (error) {
    next(error)
  }

}
