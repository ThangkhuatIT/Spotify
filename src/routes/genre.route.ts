import { Router } from 'express'
import { doCreateGenre } from '~/controllers/genre.controller'
import { checkJwt } from '~/middlewares/checkJwt.middleware'
import { checkRole } from '~/middlewares/checkRole.middleware'
import { middlewareUploadImage } from '~/middlewares/upload.middleware'
import { checkValidationResult, validateCreateGenre } from '~/middlewares/validations.middleware'
import { wrapCallbacksInTryCatch } from '~/utils/wrapCallbacksInTryCatch'

const genreRoute = Router()
genreRoute.post('/', middlewareUploadImage,validateCreateGenre(), checkValidationResult, wrapCallbacksInTryCatch(doCreateGenre))
