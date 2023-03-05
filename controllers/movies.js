const Movie = require("../models/movie.js")
const createHttpError = require("http-errors")

exports.create_movie = async (req, res) => {
  const properties = req.body
  const movie = await Movie.create(properties)
  console.log(`[Mongoose] Movie ${movie._id} created`)
  res.send(movie)
}

exports.read_movies = async (req, res) => {
  const { skip = 0, limit = 10, sort = "_id", order = 1, ...query } = req.query

  const items = await Movie.find(query)
    .populate("director")
    .sort({ [sort]: order })
    .skip(Number(skip))
    .limit(Math.max(Number(limit), 0))

  const total = await Movie.countDocuments(query)

  const response = { total, skip, limit, items }

  console.log(`[Mongoose] Movies queried`)
  res.send(response)
}

exports.read_movie = async (req, res) => {
  const { _id } = req.params
  const movie = await Movie.findOne({ _id })
    .populate("director")
    .populate("actors")

  if (!movie) throw createHttpError(404, `Movie ${_id} not found`)

  console.log(`[Mongoose] Movie ${_id} queried`)
  res.send(movie)
}

exports.update_movie = async (req, res) => {
  const { _id } = req.params
  const properties = req.body

  // NOTE: updating using save() is the recommended way
  const updatedMovie = await Movie.findOneAndUpdate({ _id }, properties, {
    new: true,
  })
  if (!updatedMovie) throw createHttpError(404, `Movie ${_id} not found`)

  console.log(`[Mongoose] Movie ${_id} updated`)
  res.send(updatedMovie)
}

exports.delete_movie = async (req, res) => {
  const { _id } = req.params
  const movie = await Movie.findOneAndDelete({ _id })

  if (!movie) throw createHttpError(404, `Movie ${_id} not found`)

  console.log(`[Mongoose] Movie ${_id} deleted`)
  res.send(movie)
}
