import express from "express"
import { asyncHandler, catchAsync } from "../../utils/asyncHandler"
import projectController from "../../controller/project.controller"
import MessageController from "../../controller/message.controller"

export const projectRouter = express.Router()

projectRouter.post("/", projectController.create)

projectRouter.post("/add", asyncHandler(projectController.addProject) as any)
projectRouter.post(
  "/getall",
  asyncHandler(projectController.getAllProjectByUserID) as any
)
projectRouter.post(
  "/getdetail",
  asyncHandler(projectController.getProjectDetails) as any
)
projectRouter.delete(
  "/delete/:projectID",
  asyncHandler(projectController.deleteProject) as any
)
projectRouter.post(
  "/user/add",
  asyncHandler(projectController.addUserToProject) as any
)

projectRouter.post(
  "/column/add",
  asyncHandler(projectController.addColumnToProject) as any
)
projectRouter.post(
  "/column/getall",
  asyncHandler(projectController.getAllColumn) as any
)
projectRouter.post(
  "/column/delete/:columnID",
  asyncHandler(projectController.deleteColumn) as any
)
projectRouter.post(
  "/column/changeindex",
  asyncHandler(projectController.changeIndexColumn) as any
)

projectRouter.post("/task/add", asyncHandler(projectController.addTask) as any)
projectRouter.post(
  "/task/getAll",
  asyncHandler(projectController.getAllTask) as any
)

projectRouter.post(
  "/task/changeindex",
  asyncHandler(projectController.changeIndexTask) as any
)

projectRouter.delete(
  "/task/delete/:taskID",
  asyncHandler(projectController.deleteTaskByTaskID) as any
)

projectRouter.get(
  "/messages",
  asyncHandler(MessageController.getListMessage) as any
)

projectRouter.get(
  "/users",
  asyncHandler(projectController.getListUser) as any
)
