import { Schema, model } from "mongoose"

interface IPerson {
  name: string
  age: number
}

const schema = new Schema<IPerson>({
  name: String,
  age: Number,
  // Note: No ref to movies. See https://mongoosejs.com/docs/populate.html#refs-to-children
})

export default model<IPerson>("Person", schema)
