export type CreateGenreDto = {
  createdAt: Date
  updatedAt: Date
  name: string
  description?: string
  imageUrl: string
  imageId: string
  alias?: string
}
export type UpdateGenreDto = {
  updatedAt: Date
  name?: string
  description?: string
  imageUrl?: string
  imageId?: string
  alias?: string
}