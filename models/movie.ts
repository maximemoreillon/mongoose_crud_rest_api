import { Schema, model } from "mongoose";

interface IMovie {
  title: string;
  year: number;
}

const schema = new Schema<IMovie>({
  title: String,
  year: Number,
});

export default model<IMovie>("Movie", schema);
