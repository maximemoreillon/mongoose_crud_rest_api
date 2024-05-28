import mongoose from "mongoose"

export const {
  MONGODB_CONNECTION_STRING,
  MONGODB_PROTOCOL = "mongodb",
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_HOST = "mongo",
  MONGODB_PORT,
  MONGODB_DB = "example",
  MONGODB_OPTIONS = "",
} = process.env

const mongodbPort = MONGODB_PORT ? `:${MONGODB_PORT}` : ""

const connectionString =
  MONGODB_CONNECTION_STRING ||
  (MONGODB_USERNAME && MONGODB_PASSWORD
    ? `${MONGODB_PROTOCOL}://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}${mongodbPort}/${MONGODB_DB}${MONGODB_OPTIONS}`
    : `${MONGODB_PROTOCOL}://${MONGODB_HOST}${mongodbPort}/${MONGODB_DB}${MONGODB_OPTIONS}`)

export const redactedConnectionString = connectionString.replace(
  /:.*@/,
  "://***:***@"
)

export const connect = async () => {
  try {
    console.log(`[Mongoose] Connecting to ${redactedConnectionString}`)

    await mongoose.connect(connectionString)
    console.log(`[Mongoose] MongoDB connected`)
  } catch (e) {
    console.log(`[Mongoose] MongoDB connection ERROR`)
    setTimeout(connect, 5000)
  }
}
