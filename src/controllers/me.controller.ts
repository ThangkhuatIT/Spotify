import { Response, Request } from 'express'

export async function handleUpdateUserProfile(req: Request, res: Response) {
  res.status(200).send('Updated Profile')
}
