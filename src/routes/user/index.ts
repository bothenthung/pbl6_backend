import { Request, Response, Router } from "express"
import userController from "../../controller/user.controller"
import { asyncHandler } from "../../utils/asyncHandler"

export const userRouter = Router()

userRouter.get("/:username", asyncHandler(userController.getUserByID) as any)
userRouter.patch(
  "/updateuser",
  asyncHandler(userController.updateUserByID) as any
)
userRouter.delete(
  "/deleteuser",
  asyncHandler(userController.deleteUserByID) as any
)
