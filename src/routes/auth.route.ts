import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import { checkValidationResult, validateLogin, validateRegister } from '../middlewares/validations.middleware'
import { wrapCallbacksInTryCatch } from '~/utils/wrapCallbacksInTryCatch'
import { checkJwt } from '~/middlewares/checkJwt.middleware'
const authRoute = Router()
authRoute.post('/register', validateRegister(), checkValidationResult, wrapCallbacksInTryCatch(authController.register))
authRoute.post('/login', validateLogin(), checkValidationResult, wrapCallbacksInTryCatch(authController.login))
authRoute.post('/refresh-token', wrapCallbacksInTryCatch(authController.refreshToken))
authRoute.get('/verify-email', wrapCallbacksInTryCatch(authController.verifyEmail))
authRoute.post('/logout', wrapCallbacksInTryCatch(authController.logout))
authRoute.post('/reset-password',checkJwt,wrapCallbacksInTryCatch(authController.resetPass))
export default authRoute
