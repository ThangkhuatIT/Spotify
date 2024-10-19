import { Router } from 'express'
import { postMusic } from '~/controllers/song.controller'
import { checkJwt } from '~/middlewares/checkJwt.middleware'
import { middlewareUploadSong } from '~/middlewares/upload.middleware'
import { checkValidationResult, validatePostSong } from '~/middlewares/validations.middleware'
import { deleteSong, updateSong } from '~/services/song.services'
import { wrapCallbacksInTryCatch } from '~/utils/wrapCallbacksInTryCatch'

const songRoute = Router()
songRoute.post('/', middlewareUploadSong, validatePostSong(), checkValidationResult, wrapCallbacksInTryCatch(postMusic))
songRoute.patch('/', wrapCallbacksInTryCatch(updateSong))
songRoute.delete('/', wrapCallbacksInTryCatch(deleteSong))
export default songRoute
