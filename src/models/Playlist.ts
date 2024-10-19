import { model, Schema, Types } from 'mongoose'

export interface IPlaylist {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
  name: string
  description?: string
  imageUrl?: string
  imageId?: string
  totalLength: number
  likeCount: number
  songCount: number //luot nghe
  alias?: string
  status: string
  userId: string
  songIds: string[]
  likedUsers: string[]
  genre: Types.ObjectId
}
const playlistSchema = new Schema<IPlaylist>({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  imageUrl: {
    type: String,
    default: null
  },
  imageId: {
    type: String,
    default: null
  },
  totalLength: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
  },
  songCount: {
    type: Number,
    default: 0
  },
  alias: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['PUBLIC', 'PRIVATE'],
    default: 'PUBLIC'
  },
  songIds: {
    type: [String],
    required: true
  },
  userId: {
    type: String,
    default: null
  },
  likedUsers: {
    type: [String],
    default: []
  },
  genre: {
    type: Schema.Types.ObjectId,
    required: true
  }
})
const Playlist = model('Playlist',playlistSchema)
export default Playlist
