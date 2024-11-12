import { Types } from 'mongoose'
import { updateProfileDto } from '~/dtos/user.dtos'
import User, { IUser } from '~/models/User'
import ApiError from '~/utils/ApiError'

export async function getProfile(id: string): Promise<IUser> {
  const user = await User.findOne({ _id: id })
  if (!user) {
    throw new ApiError(404, 'user not exits')
  }
  user.password = ''
  return user
}
export async function updateProfile(id: Types.ObjectId, payload: updateProfileDto): Promise<IUser> {
  let user = await User.findOne({ _id: id })
  if (!user) throw new ApiError(401, 'Invalid credentials')
  payload.about && (user.about = payload.about)
  payload.name && (user.name = payload.name)
  // payload.birthDate && (user.birthDate = payload.birthDate)
  payload.gender && (user.gender = payload.gender)
  payload.image && (user.image = payload.image)
  payload.imageId && (user.imageId = payload.imageId)
  const newUser = await user.save()
  return newUser
}
