import { CreateGenreDto, UpdateGenreDto } from '~/dtos/genre.dtos'
import Genre, { IGenre } from '~/models/Genre'
import ApiError from '~/utils/ApiError'
import { deleteFile } from '~/utils/upload'

export async function createGenre(payload: CreateGenreDto): Promise<IGenre> {
  const { createdAt, updatedAt, name, description, imageUrl, imageId, alias } = payload
  try {
    const genre = new Genre({
      createdAt,
      updatedAt,
      name,
      description,
      imageUrl,
      imageId,
      alias
    })
    const newGenre = genre.save()
    return newGenre
  } catch (error: any) {
    deleteFile(imageId)
    throw new ApiError(500, error.message)
  }
}
export async function deleteGenre(genreId: string) {
  try {
    await Genre.deleteOne({ _id: genreId })
  } catch (error: any) {
    throw new ApiError(500, error.message)
  }
}
export async function updateGenre(genreId: string, payload: UpdateGenreDto) {
  const genre = await Genre.findOne({ _id: genreId })
  if (!genre) throw new ApiError(404, 'Genre not found')
  try {
    if (payload.alias) genre.alias = payload.alias
    if (payload.description) genre.description = payload.description
    // if (payload.imageUrl) genre.imageUrl = payload.imageUrl
    // if (payload.imageId) genre.imageId = payload.imageId
    if (payload.name) genre.name = payload.name
    genre.updatedAt = new Date()
    await genre.save()
  } catch (error: any) {
    throw new ApiError(500, error.message)
  }
}
