import express from "express"
import AuthController from "../../controller/auth.controller"
import { asyncHandler } from "../../utils/asyncHandler"
export const authRouter = express.Router()
//sign up
authRouter.post("/user/signup", asyncHandler(AuthController.signup))
