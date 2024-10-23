import { generateRandomString } from '../utils/randomString'
import { sendEmailQueue } from './bullQueue.services'
import { signJwt, verifyJwt } from '../utils/jwt'
import * as tokenSevices from '../services/token.services'
import ApiError from '../utils/ApiError'
import bcrypt from 'bcrypt'
import Config from '../config'
import Token from '../models/Token'
import User, { IUser } from '../models/User'
import { loginDto, registerDto } from '~/dtos/auth.dtos'
export async function register(payload: registerDto): Promise<IUser> {
  const { email, name, password } = payload
  const user = await User.findOne({ email })
  if (user) {
    throw new ApiError(400, 'user already exists')
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = new User({
    name: name,
    email: email,
    password: passwordHash
  })
  await newUser.save()
  const newConfirmEmailToken = generateRandomString()
  const userId = newUser._id
  await tokenSevices.saveConfirmEmailToken({
    userId: newUser._id,
    token: newConfirmEmailToken
  })
  sendEmailQueue.add({
    newConfirmEmailToken,
    email,
    userId
  })
  return newUser
}

export async function login(payload: loginDto): Promise<{
  accessToken: string
  refreshToken: string
  user: {
    name: string
    email: string
  }
}> {
  const { email, passWord } = payload
  const user = await User.findOne({ email })
  if (!user) {
    throw new ApiError(401, 'Invalid credentials')
  }
  const isMatchPassword = await bcrypt.compare(passWord, user.password)
  if (!isMatchPassword) {
    throw new ApiError(401, 'Invalid credentials')
  }
  if (user.locked) {
    throw new ApiError(403, 'You are locked out!')
  }
  const [accessToken, refreshToken] = await Promise.all([
    signJwt({ user: user }, Config.ACCESS_TOKEN_EXPIRATION),
    signJwt({ user: user }, Config.REFRESH_TOKEN_EXPIRATION)
  ])
  await tokenSevices.saveRefreshToken({
    userId: user._id,
    token: refreshToken as string
  })
  return {
    accessToken: accessToken as string,
    refreshToken: refreshToken as string,
    user: {
      name: user.name,
      email: user.email
    }
  }
}
export async function verifyEmail(token: string, id: string) {
  const user = await User.findOne({ _id: id })
  if (!user) throw new ApiError(404, 'User not found')
  if (user.emailConfirmed) return
  const emailConfirmToken = await Token.findOne({ token: token })
  if (!emailConfirmToken || emailConfirmToken.type != 'CONFIRM_EMAIL' || emailConfirmToken.expirytime < new Date()) {
    throw new ApiError(401, 'Invalid token')
  }
  user.emailConfirmed = true
  await Promise.all([user.save(), Token.deleteOne({ token: token })])
}
export async function logout(token: string) {
  try {
    await Token.deleteOne({ token: token })
  } catch (error: any) {
    throw new ApiError(400, error.message)
  }
}
export async function refreshToken(token: string) {
  const data = Token.findOne({ token: token })
  if (!data) throw new ApiError(404, 'token not exits')
  try {
    const payload = await verifyJwt(token) as any
    if (payload) {
      const accessToken = await signJwt({user:payload.user}, Config.ACCESS_TOKEN_EXPIRATION)
      return accessToken
    }
  } catch (error: any) {
    await Token.deleteOne({ token: token })
    throw new ApiError(403, error.message)
  }
}
