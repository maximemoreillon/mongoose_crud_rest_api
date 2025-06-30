import "dotenv/config";
import express from "express";
import cors from "cors";
import { connect as dbConnect, redactedConnectionString } from "./db";
import movies_router from "./routes/movies";
import { version } from "./package.json";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";

const { EXPRESS_PORT = 3001 } = process.env;

dbConnect();

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    application_name: "Express + Mongoose CRUD",
    version,
    mongodb_connection_string: redactedConnectionString,
  });
});

app.use("/movies", movies_router);

// Express error handling
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const { statusCode = 500, message } = err;
  res.status(statusCode).send(message);
});

// Listen on designated port
app.listen(EXPRESS_PORT, () => {
  console.log(`[Express] Express listening on port ${EXPRESS_PORT}`);
});
