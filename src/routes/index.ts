import { Router } from "express"
import { authRouter } from "./auth"
import { userRouter } from "./user"

export const routes = Router()

routes.use("/v1/api", authRouter)
