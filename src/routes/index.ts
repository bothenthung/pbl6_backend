import { Router } from "express"
import { authRouter } from "./auth"
import { userRouter } from "./user"
import { spellCorrectionRouter } from "./spellcorrection"
import { projectRouter } from "./project"
import { publicRouter } from "./public"

export const routes = Router()

routes.use("/v1/api/spellcorrection", spellCorrectionRouter)
routes.use("/v1/api/public", publicRouter)
routes.use("/v1/api", authRouter)
routes.use("/v1/api/project", projectRouter)
routes.use("/v1/api/user", userRouter)
