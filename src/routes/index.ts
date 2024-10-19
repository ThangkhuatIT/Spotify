import { Router } from 'express'
import userRoute from "./users.route";
import authRoute from './auth.route'
import songRoute from './song.route';

const route = Router()

route.use("/api/v1/users", userRoute);
route.use('/api/v1/auth', authRoute)

export default route
