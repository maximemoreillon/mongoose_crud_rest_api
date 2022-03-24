const Movie = require('../models/movie.js')

exports.create_movie = async (req, res) => {
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
    const movies = await Movie
      .find(query)
      .populate('director')

    console.log(`[Mongoose] Movies queried`)
    res.send(movies)
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
    const result = await Movie.findOneAndUpdate({_id},properties)
    console.log(`[Mongoose] Movie ${_id} updated`)
    res.send(result)
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