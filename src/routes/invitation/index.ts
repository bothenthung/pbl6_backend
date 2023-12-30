import { Router } from "express"
import invitationController from "../../controller/invitation.controller"
import { asyncHandler } from "../../utils/asyncHandler"

export const invitationRouter = Router()

invitationRouter.post("/", asyncHandler(invitationController.inviteUserToProject) as any)

