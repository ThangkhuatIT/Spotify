import User, { IUser } from '~/models/User'
import ApiError from '~/utils/ApiError'

export async function getProfile(id: string): Promise<IUser> {
  const user = await User.findOne({ _id: id })
  if (!user) {
    throw new ApiError(404, 'user not exits')
  }
  user.password = '';
  return user
}
