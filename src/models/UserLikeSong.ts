import { model, Schema } from 'mongoose'

export interface IUserLikeSong {
  userId: string
  songId: string
  likedAt: Date
}
const userSongSchema = new Schema<IUserLikeSong>({
  likedAt: { type: Date, default: Date.now },
  userId: {
    type: String,
    required: true
  },
  songId: {
    type: String,
    required: true
  }
})
const UserSong = model('UserSong', userSongSchema)
export default UserSong