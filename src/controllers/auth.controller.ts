import { Request, Response } from 'express'
import * as authService from '../services/auth.services'
export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body
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
  return res.status(200).json(data)
}
export async function logout(req: Request, res: Response) {
  const { refreshToken } = req.body
  await authService.logout(refreshToken)
  return res.status(200).send({ message: 'Logged out successfully' })
}
export async function verifyEmail(req: Request, res: Response) {
  const { token, id } = req.query
  await authService.verifyEmail(token as string, id as string)
  return res.status(200).json('ok')
}
export async function refreshToken(req: Request, res: Response) {
  const { refreshToken } = req.body
  const data = await authService.refreshToken(refreshToken)
  return res.status(200).json({ accessToken: data })
}
export async function resetPass(req: Request, res: Response) {
  const { user } = req
  const { password, newPassword } = req.body
  const result = await authService.resetPass(user.id, { password, newPassword })
  return res.status(200).json(result)
}
