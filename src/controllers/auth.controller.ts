import { Request, Response } from 'express'
import * as authService from '../services/auth.services'
export async function register(req: Request, res: Response) {
  const {name, email, password } = req.body
  const newuser = await authService.register({
    name,
    email,
    password
  })
  return res.status(200).json({
    id: newuser._id,
    email: newuser.email
  })
}
export async function login(req: Request, res: Response) {
  const { email, passWord } = req.body
  const data = await authService.login({ email, passWord })
  return res.status(200).json({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken
  })
}
export async function verifyEmail(req: Request, res: Response) {
  const { token, id } = req.query
  await authService.verifyEmail(token as string, id as string)
  return res.status(200).json('ok')
}
