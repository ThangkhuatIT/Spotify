// import { Router } from "express";
// import * as meController from "../controllers/me.controller";
// import wrapCallbacksInTryCatch from "../utils/wrapCallbacksInTryCatch";
// import { checkValidationResult, validateUpdateProfile } from "../middlewares/validations.middleware";

// const meRoute = Router();
// meRoute.patch(
//     "/",
//     validateUpdateProfile(),
//     checkValidationResult,
//     wrapCallbacksInTryCatch(meController.handleUpdateUserProfile)
// );

// export default meRoute;