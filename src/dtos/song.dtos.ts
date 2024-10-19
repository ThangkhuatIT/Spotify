import { Types } from 'mongoose'

export type PostSongDto = {
  name: string
  songUrl: string
  songIdFile:string
  imageUrl: string
  imageUrlId: string
  length: number
  releasedAt?: Date
  alias?: string
  language: string
  artists: Types.ObjectId[]
  genre: Types.ObjectId
}
export type updateSongDto = {
  name?: string
  songUrl?: string
  imageUrl?: string
  length?: number
  releasedAt?: Date
  alias?: string
  language?: string
  artists?: Types.ObjectId[]
  genre?: Types.ObjectId
}
