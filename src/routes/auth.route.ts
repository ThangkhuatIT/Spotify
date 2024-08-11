import { Router } from "express";
import * as authController from '../controllers/auth.controller'
import wrapCallbacksInTryCatch from "../utils/wrapCallbacksInTryCatch";
import { checkValidationResult, validateLogin, validateRegister } from "../middlewares/validations.middleware";
const authRoute = Router();
authRoute.post(
    "/register",
    validateRegister(),
    checkValidationResult,
    wrapCallbacksInTryCatch(authController.register)
);
authRoute.post(
    "/login",
    validateLogin,
    wrapCallbacksInTryCatch(authController.login)
);
authRoute.get(
    "/verify-email/:token/:id",
    wrapCallbacksInTryCatch(authController.verifyEmail)
);
export default authRoute;