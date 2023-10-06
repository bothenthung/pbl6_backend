import express from "express"
import AuthController from "../../controller/auth.controller"
import { asyncHandler } from "../../utils/asyncHandler"
import { authentication } from "../../utils/auth"

const authRouter: express.Router = express.Router()
authRouter.post("/user/signup", asyncHandler(AuthController.signup))
authRouter.post("/user/login", asyncHandler(AuthController.login))

authRouter.use(authentication)

export { authRouter }
