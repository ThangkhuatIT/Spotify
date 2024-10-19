import { model, Schema, Types } from 'mongoose'
export interface IGenre {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
  name: string
  description?: string
  imageUrl: string
  imageId: string
  alias?: string
}
const genreChema = new Schema<IGenre>({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  name: {
    type: String,
    unique:true,
    required: true
  },
  alias: {
    type: String,
    default: null
  },
  imageUrl: {
    type: String
  },
  imageId: {
    type: String
  },
  description: {
    type: String,
    default: null
  }
})
const Genre = model('Genre', genreChema)
export default  Genre