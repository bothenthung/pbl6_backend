import { Router } from "express"
import { authRouter } from "./auth"
import { userRouter } from "./user"
import { noteRouter } from "./note"

export const routes = Router()

routes.use("/v1/api", authRouter)
routes.use("/v1/api/note", noteRouter)
routes.use("/v1/api/user", userRouter)
