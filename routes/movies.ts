import { Router } from "express"
import {
  read_movie,
  read_movies,
  create_movie,
  delete_movie,
  update_movie,
} from "../controllers/movies"

const router = Router()

router.route("/").get(read_movies).post(create_movie)

router.route("/:_id").get(read_movie).patch(update_movie).delete(delete_movie)

export default router
