import express, { Router } from "express"

import { asyncHandler } from "../../utils/asyncHandler"
import { authentication, receiveRefreshToken } from "../../utils/auth"
import AuthController from "../../controller/auth.controller"

export const authRouter: Router = express.Router()
authRouter.post("/user/signup", asyncHandler(AuthController.signup) as any)
authRouter.post("/user/login", asyncHandler(AuthController.login) as any)

authRouter.post(
  "/user/refreshtoken",
  receiveRefreshToken as any,
  asyncHandler(AuthController.handleRefreshToken) as any
)

authRouter.use(authentication as any)

authRouter.post("/user/logout", asyncHandler(AuthController.logout) as any)
