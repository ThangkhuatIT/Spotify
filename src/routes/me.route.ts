import { Router } from "express";
import * as meController from "../controllers/me.controller";
import { checkJwt } from "~/middlewares/checkJwt.middleware";
import { wrapCallbacksInTryCatch } from "~/utils/wrapCallbacksInTryCatch";
const meRoute = Router();
meRoute.get('/',checkJwt,wrapCallbacksInTryCatch(meController.getProfile))
export default meRoute;