import { Schema, model, Types } from "mongoose"

const schema = new Schema({
  title: String,
  year: Number,
  director: { type: Types.ObjectId, ref: "Person" },
  actors: [{ type: Types.ObjectId, ref: "Person" }],
})

export default model("Movie", schema)
