import { Router } from "express"
import { authRouter } from "./auth"
import { projectRouter } from "./project"
import { publicRouter } from "./public"
import { spellCorrectionRouter } from "./spellcorrection"
import { userRouter } from "./user"
import { invitationRouter } from "./invitation"

export const routes = Router()

routes.use("/v1/api/spellcorrection", spellCorrectionRouter)
routes.use("/v1/api/public", publicRouter)
routes.use("/v1/api", authRouter)
routes.use("/v1/api/project", projectRouter)
routes.use("/v1/api/user", userRouter)
routes.use("/v1/api/invite", invitationRouter)
