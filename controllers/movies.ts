import Movie from "../models/movie"
import createHttpError from "http-errors"
import { Request, Response } from "express"

export const create_movie = async (req: Request, res: Response) => {
  const properties = req.body
  const movie = await Movie.create(properties)
  console.log(`[Mongoose] Movie ${movie._id} created`)
  res.send(movie)
}

export const read_movies = async (req: Request, res: Response) => {
  const {
    skip = 0,
    limit = 10,
    sort = "_id",
    order = 1,
    ...query
  } = req.query as any

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

export const read_movie = async (req: Request, res: Response) => {
  const { _id } = req.params
  const movie = await Movie.findOne({ _id })
    .populate("director")
    .populate("actors")

  if (!movie) throw createHttpError(404, `Movie ${_id} not found`)

  console.log(`[Mongoose] Movie ${_id} queried`)
  res.send(movie)
}

export const update_movie = async (req: Request, res: Response) => {
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

export const delete_movie = async (req: Request, res: Response) => {
  const { _id } = req.params
  const movie = await Movie.findOneAndDelete({ _id })

  if (!movie) throw createHttpError(404, `Movie ${_id} not found`)

  console.log(`[Mongoose] Movie ${_id} deleted`)
  res.send(movie)
}
