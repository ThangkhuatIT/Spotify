import { promises } from 'dns'
import { Types } from 'mongoose'
import { updateProfileDto } from '~/dtos/user.dtos'
import Song from '~/models/Song'
import User, { IUser } from '~/models/User'
import UserPlaylist, { IUserLikePlaylist } from '~/models/UserLikePlaylist'
import UserSong, { IUserLikeSong } from '~/models/UserLikeSong'
import ApiError from '~/utils/ApiError'

export async function updateProfile(id: Types.ObjectId, payload: updateProfileDto): Promise<IUser> {
  let user = await User.findOne({ _id: id })
  if (!user) throw new ApiError(401, 'Invalid credentials')

  return user
}
export async function likedSong(songId: Types.ObjectId, userId: Types.ObjectId): Promise<IUserLikeSong> {
  const [user, song] = await Promise.all([User.findOne({ _id: userId }), Song.findOne({ _id: songId })])
  if (!user) throw new ApiError(404, 'user not found')
  if (!song) throw new ApiError(404, 'song not found')
  try {
    const userLikeSOng = new UserSong({ userId, songId })
    await userLikeSOng.save()
    return userLikeSOng
  } catch (error: any) {
    throw new ApiError(500, error.message)
  }
}
export async function likedPlaylist(playlistId: Types.ObjectId, userId: Types.ObjectId): Promise<IUserLikePlaylist> {
  const [user, playlist] = await Promise.all([User.findOne({ _id: userId }), Song.findOne({ _id: playlistId })])
  if (!user) throw new ApiError(404, 'user not found')
  if (!playlist) throw new ApiError(404, 'song not found')
  try {
    const userLikePlaylist = new UserPlaylist({ userId, playlistId })
    await userLikePlaylist.save()
    return userLikePlaylist
  } catch (error: any) {
    throw new ApiError(500, error.message)
  }
}