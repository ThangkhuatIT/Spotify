import { Response, Request } from 'express'
import * as meServices from '../services/me.services'
export async function handleUpdateUserProfile(req: Request, res: Response) {
  res.status(200).send('Updated Profile')
}
export async function getProfile(req: Request, res: Response) {
  const user = req.user
  const account = await meServices.getProfile(user.id)
  res.status(200).json(account)
}
export async function updateProfile(req: Request, res: Response) {
  const user = req.user
  const { name, about, gender, image, birthDate, imageId } = req.body
  const result = await meServices.updateProfile(user.id, { name, about, gender, image, birthDate, imageId })
  res.status(200).json(result)
}
