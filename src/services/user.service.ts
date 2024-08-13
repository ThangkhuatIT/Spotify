import User, { IUser } from '../models/User'
import ApiError from '../utils/ApiError'

export async function createUser({
  externalId,
  email,
  name,
  phoneNumber
}: {
  externalId: string
  email: string
  name: string
  phoneNumber?: string
}): Promise<IUser> {
  try {
    let user = new User({
      externalId,
      email,
      name,
      phoneNumber
    })

    user = await user.save()

    return user.toObject()
  } catch (error: any) {
    throw new ApiError(500, error.message)
  }
}
