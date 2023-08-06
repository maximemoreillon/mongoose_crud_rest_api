import { Schema, model, Types } from "mongoose"

interface IMovie {
  title: string
  year: number
  director: { type: typeof Types.ObjectId; ref: string }
  actors: { type: typeof Types.ObjectId; ref: string }[]
}

const schema = new Schema<IMovie>({
  title: String,
  year: Number,
  director: { type: Types.ObjectId, ref: "Person" },
  actors: [{ type: Types.ObjectId, ref: "Person" }],
})

export default model<IMovie>("Movie", schema)
