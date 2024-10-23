import { Types } from 'mongoose'
import Token, { IToken } from '../models/Token'
import ApiError from '../utils/ApiError'
import { signJwt, verifyJwt } from '~/utils/jwt'
import Config from '~/config'

export async function saveConfirmEmailToken({
  userId,
  token
}: {
  userId: Types.ObjectId
  token: string
}): Promise<IToken> {
  try {
    const expirytime = new Date()
    expirytime.setDate(expirytime.getDate() + 1)
    const newToken = new Token({
      userId: userId,
      token: token,
      type: 'CONFIRM_EMAIL',
      expirytime: expirytime
    })
    newToken.save()
    return newToken
  } catch (error: any) {
    throw new ApiError(500, error.message)
  }
}
export async function saveRefreshToken({ userId, token }: { userId: Types.ObjectId; token: string }): Promise<IToken> {
  try {
    const newToken = new Token({
      userId: userId,
      token: token,
      type: 'REFRESH_TOKEN'
    })
    newToken.save()
    return newToken
  } catch (error: any) {
    throw new ApiError(500, error.message)
  }
}

