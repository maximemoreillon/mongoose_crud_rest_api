import mongoose from "mongoose";

export const { MONGODB_URI = "mongodb://localhost:27017/movies-crud" } =
  process.env;

export const redactedConnectionString = MONGODB_URI.replace(
  /:.*@/,
  "://***:***@"
);

export const connect = async () => {
  try {
    console.log(`[Mongoose] Connecting to ${redactedConnectionString}`);

    await mongoose.connect(MONGODB_URI);
    console.log(`[Mongoose] MongoDB connected`);
  } catch (e) {
    console.log(`[Mongoose] MongoDB connection ERROR`);
    setTimeout(connect, 5000);
  }
};
