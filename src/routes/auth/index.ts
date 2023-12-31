import express, { Router } from "express"

import { asyncHandler, catchAsync } from "../../utils/asyncHandler"
import { authentication, receiveRefreshToken } from "../../utils/auth"
import AuthController from "../../controller/auth.controller"

export const authRouter: Router = express.Router()

authRouter.post("/signup", AuthController.signup)

authRouter.post("/login", AuthController.login)

authRouter.post(
  "/refreshtoken",
  receiveRefreshToken as any,
  asyncHandler(AuthController.handleRefreshToken) as any
)

authRouter.post("/logout", AuthController.logout)
