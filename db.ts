import mongoose from "mongoose";

export const { MONGODB_URI = "mongodb://localhost:27017/movies-crud" } =
  process.env;

const redactedUrl = new URL(MONGODB_URI);
if (redactedUrl.username) redactedUrl.username = "***";
if (redactedUrl.password) redactedUrl.password = "***";
export const redactedConnectionString = redactedUrl.href;

export const connect = async () => {
  try {
    console.log(`[Mongoose] Connecting to DB ${redactedConnectionString}`);

    await mongoose.connect(MONGODB_URI);
    console.log(`[Mongoose] MongoDB connected`);
  } catch (e) {
    console.log(`[Mongoose] MongoDB connection ERROR`);
    setTimeout(connect, 5000);
  }
};
