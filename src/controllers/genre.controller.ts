import { NextFunction, Request, Response } from 'express'
import { createGenre } from '~/services/genre.services'

export async function doCreateGenre(req: Request, res: Response, next: NextFunction) {
  const genre = await createGenre(req.body)
  res.status(201).json(genre)
}

