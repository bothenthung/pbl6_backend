import { Router } from "express"
import userController from "../../controller/user.controller"

export const userRouter = Router()

// userRouter.get("/:username", asyncHandler(userController.getUserByID) as any)
// userRouter.patch(
//   "/updateuser",
//   asyncHandler(userController.updateUserByID) as any
// )

userRouter.get("/", userController.getAll)

// userRouter.post("/verify-email", asyncHandler(userController.verifyEmail) as any)


// userRouter.delete(
//   "/deleteuser",
//   asyncHandler(userController.deleteUserByID) as any
// )
