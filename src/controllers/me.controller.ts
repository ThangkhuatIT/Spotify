import { Response, Request } from 'express'
import * as meServices from '../services/me.services'
export async function handleUpdateUserProfile(req: Request, res: Response) {
  res.status(200).send('Updated Profile')
}
export async function getProfile(req: Request, res: Response) {
  const user = req.body.user
  const account = await meServices.getProfile(user._id)

  res.status(200).json(account)
}

