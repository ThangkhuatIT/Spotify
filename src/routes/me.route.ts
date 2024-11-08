import { Router } from "express";
import * as meController from "../controllers/me.controller";
import { checkJwt } from "~/middlewares/checkJwt.middleware";
import { wrapCallbacksInTryCatch } from "~/utils/wrapCallbacksInTryCatch";
import { middlewareUploadImage } from "~/middlewares/upload.middleware";
const meRoute = Router();
meRoute.get('/',checkJwt,wrapCallbacksInTryCatch(meController.getProfile))
meRoute.patch('/',checkJwt,middlewareUploadImage,wrapCallbacksInTryCatch(meController.updateProfile))
export default meRoute;