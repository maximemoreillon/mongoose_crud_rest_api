import Movie from "../models/movie";
import createHttpError from "http-errors";
import { Request, Response } from "express";
import { z } from "zod";

export const create_movie = async (req: Request, res: Response) => {
  const properties = req.body;
  const movie = await Movie.create(properties);
  res.send(movie);
};

export const read_movies = async (req: Request, res: Response) => {
  const searchParamsSchema = z.object({
    skip: z.coerce.number().default(0),
    limit: z.coerce.number().gt(0).default(10),
    sort: z.string().default("_id"),
    order: z.coerce
      .number()
      .pipe(z.union([z.literal(1), z.literal(-1)]).default(1)),
  });

  const {
    skip = 0,
    limit = 10,
    sort = "_id",
    order = 1,
    ...query
  } = searchParamsSchema.parse(req.query);

  const items = await Movie.find(query)
    .sort({ [sort]: order })
    .skip(skip)
    .limit(Math.max(Number(limit), 0));

  const total = await Movie.countDocuments(query);

  const response = { total, skip, limit, items };

  res.send(response);
};

export const read_movie = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const movie = await Movie.findOne({ _id });

  if (!movie) throw createHttpError(404, `Movie ${_id} not found`);

  res.send(movie);
};

export const update_movie = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const properties = req.body;

  // NOTE: updating using save() is the recommended way
  const updatedMovie = await Movie.findOneAndUpdate({ _id }, properties, {
    new: true,
  });
  if (!updatedMovie) throw createHttpError(404, `Movie ${_id} not found`);

  res.send(updatedMovie);
};

export const delete_movie = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const movie = await Movie.findOneAndDelete({ _id });

  if (!movie) throw createHttpError(404, `Movie ${_id} not found`);

  res.send(movie);
};
