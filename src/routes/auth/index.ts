import express from "express"
import AuthController from "../../controller/auth.controller"
export const authRouter = express.Router()
//sign up
authRouter.post("/user/signup", AuthController.signup)
