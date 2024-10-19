import { Request, Response } from 'express'
import { postSong } from '~/services/song.services'
import { deleteFile } from '~/utils/upload'

export async function postMusic(req: Request, res: Response) {
  const newSong = await postSong(req.body)
  return res.status(201).json(newSong)
}
