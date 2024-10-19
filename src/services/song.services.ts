import exp from 'constants'
import { Types } from 'mongoose'
import { PostSongDto, updateSongDto } from '~/dtos/song.dtos'
import Song, { ISong } from '~/models/Song'
import ApiError from '~/utils/ApiError'
import { deleteFile } from '~/utils/upload'

export async function postSong(payload: PostSongDto): Promise<ISong> {
  const { name, songUrl, songIdFile, imageUrlId, imageUrl, length, releasedAt, alias, language, artists, genre } =
    payload
  try {
    const newSong = new Song({
      name,
      songUrl,
      imageUrl,
      length,
      imageUrlId,
      songIdFile,
      releasedAt,
      alias,
      language,
      artists,
      genre
    })
    await newSong.save()
    return newSong
  } catch (error: any) {
    deleteFile(songIdFile, imageUrlId)
    throw new ApiError(500, error.message)
  }
}
export async function deleteSong(id: string) {
  try {
    const result = Song.deleteOne({ _id: id })
  } catch (error: any) {
    throw new ApiError(500, error.message)
  }
}
export async function updateSong(id: string, payload: updateSongDto): Promise<ISong> {
  const song = await Song.findOne({ _id: id })
  if (!song) throw new ApiError(404, 'Song does not exist')
  try {
    if (updateSong.name) song.name = updateSong.name
    song.updatedAt = new Date()
    await song.save()
    return song
  } catch (error: any) {
    throw new ApiError(500, error.message)
  }
}

export async function likedSong(songId: Types.ObjectId): Promise<void> {
  const song = await Song.findOne({ _id: songId })
  if (!song) throw new ApiError(404, 'Song does not exist')
  try {
    song.likeCount = song.likeCount + 1
    await song.save()
  } catch (error: any) {
    throw new ApiError(500, error.message)
  }
}
export async function disLikedSong(songId: Types.ObjectId): Promise<void> {
  const song = await Song.findOne({ _id: songId })
  if (!song) throw new ApiError(404, 'Song does not exist')
  try {
    song.likeCount = song.likeCount - 1
    await song.save()
  } catch (error: any) {
    throw new ApiError(500, error.message)
  }
}
