import { Router } from "express";
import * as userController from "../controllers/users.controller";
import * as songController from "../controllers/song.controller";
import songRoute from "./song.route";

const userRoute = Router();
userRoute.use('/song',songRoute)
export default userRoute;