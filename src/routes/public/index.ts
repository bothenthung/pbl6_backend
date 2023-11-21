import { Request, Response, Router } from "express"
import { asyncHandler } from "../../utils/asyncHandler"
import publicController from "../../controller/public.controller"

export const publicRouter = Router()

publicRouter.post(
  "/checkemail",
  asyncHandler(publicController.checkEmailUser) as any
)
