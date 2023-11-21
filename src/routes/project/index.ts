import express, { Router } from "express"
import { asyncHandler } from "../../utils/asyncHandler"
import projectController from "../../controller/project.controller"

export const projectRouter: Router = express.Router()
projectRouter.post("/add", asyncHandler(projectController.createProject) as any)
projectRouter.post(
  "/getallproject",
  asyncHandler(projectController.getAllProjectByUserID) as any
)
projectRouter.post(
  "/add/user",
  asyncHandler(projectController.addUserToProject) as any
)
projectRouter.post(
  "/add/column",
  asyncHandler(projectController.addColumnToProject) as any
)
