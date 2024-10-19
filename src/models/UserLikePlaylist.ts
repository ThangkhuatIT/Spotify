import { model, Schema } from 'mongoose'

export interface IUserLikePlaylist {
  userId: string
  playlistId: string
  likedAt: Date
}
const userPlaylistSchema = new Schema<IUserLikePlaylist>({
  likedAt: { type: Date, default: Date.now },
  userId: {
    type: String,
    required: true
  },
  playlistId: {
    type: String,
    required: true
  }
})
const UserPlaylist = model('UserPlaylist', userPlaylistSchema)
export default UserPlaylist