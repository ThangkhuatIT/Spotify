import { Router } from "express";
// import userRoute from "./users.route";
// import meRoute from "./me.route";
import authRoute from "./auth.route";

const route = Router();

// route.use("/api/v1/users", userRoute);

// route.use("/api/v1/users/me", meRoute);
route.use("/api/v1/auth", authRoute);

export default route;
