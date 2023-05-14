import { Schema, model } from "mongoose"

const schema = new Schema({
  name: String,
  age: Number,
  // Note: No ref to movies. See https://mongoosejs.com/docs/populate.html#refs-to-children
})

export default model("Person", schema)
