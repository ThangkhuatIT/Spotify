import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import { checkValidationResult, validateLogin, validateRegister } from '../middlewares/validations.middleware'
import { wrapCallbacksInTryCatch } from '~/utils/wrapCallbacksInTryCatch'
const authRoute = Router()
authRoute.post('/register', validateRegister(), checkValidationResult, wrapCallbacksInTryCatch(authController.register))
authRoute.post('/login', validateLogin(), checkValidationResult, wrapCallbacksInTryCatch(authController.login))
authRoute.get('/verify-email', wrapCallbacksInTryCatch(authController.verifyEmail))
export default authRoute
