import { Router } from "express"
import {
  read_person,
  read_persons,
  create_person,
  delete_person,
  update_person,
} from "../controllers/persons"

const router = Router()

router.route("/").get(read_persons).post(create_person)

router
  .route("/:_id")
  .get(read_person)
  .patch(update_person)
  .delete(delete_person)

export default router
