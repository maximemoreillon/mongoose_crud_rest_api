import dotenv from "dotenv"
dotenv.config()
import express from "express"
import "express-async-errors"
import cors from "cors"
import { connect as dbConnect } from "./db"
import movies_router from "./routes/movies"
import persons_router from "./routes/persons"
import { version } from "./package.json"
import { Request, Response, NextFunction } from "express"
import { HttpError } from "http-errors"

const { EXPRESS_PORT = 80 } = process.env

dbConnect()

export const app = express()

app.use(cors()) // Allow cross-origin
app.use(express.json()) // Enable using JSON in request body

app.get("/", (req, res) => {
  res.send({
    application_name: "MEVN CRUD back-end",
    version,
  })
})

app.use("/movies", movies_router)
app.use("/persons", persons_router)

// Express error handling
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  const { statusCode = 500, message } = err
  res.status(statusCode).send(message)
})

// Listen on designated port
app.listen(EXPRESS_PORT, () => {
  console.log(`[Express] App listening on port ${EXPRESS_PORT}`)
})
