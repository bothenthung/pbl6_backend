import { NextFunction, Request, Response } from "express"
import { SuccessResponse } from "../core/success.reponse"
import ProjectService from "../service/project.service"

class ProjectController {
  addProject = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Create project success.",
      metadata: await ProjectService.addProject(req.user, req.body),
    }).send(res, {})
  }

  getAllProjectByUserID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get all project success.",
      metadata: await ProjectService.getAllProjectByUserID(req.user),
    }).send(res, {})
  }

  deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    const projectID = req.params.projectID
    new SuccessResponse({
      message: "Delete project success.",
      metadata: await ProjectService.deletePoject(projectID, req.user.userID),
    }).send(res, {})
  }

  getProjectDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // const projectID = req.params.projectID
    new SuccessResponse({
      message: "Get all project success.",
      metadata: await ProjectService.getProjectDetails(req.user.userID, req),
    }).send(res, {})
  }

  addUserToProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Add users success.",
      metadata: await ProjectService.addUserToProject(req),
    }).send(res, {})
  }

  addColumnToProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Add column success.",
      metadata: await ProjectService.addColumnToProject(req.body),
    }).send(res, {})
  }

  getAllColumn = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Get all columns success.",
      metadata: await ProjectService.getAllColumn(req.body.projectID),
    }).send(res, {})
  }

  deleteColumn = async (req: Request, res: Response, next: NextFunction) => {
    const columnID = req.params.columnID
    new SuccessResponse({
      message: "Delete column success.",
      metadata: await ProjectService.deleteColumn(req, columnID),
    }).send(res, {})
  }

  changeIndexColumn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Change index column success.",
      metadata: await ProjectService.changeIndexColumn(req),
    }).send(res, {})
  }

  addTask = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Add task success.",
      metadata: await ProjectService.addTask(req),
    }).send(res, {})
  }

  getAllTask = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Get all tasks success.",
      metadata: await ProjectService.getAllTask(req),
    }).send(res, {})
  }

  changeIndexTask = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Change index task success.",
      metadata: await ProjectService.changeIndexTask(req),
    }).send(res, {})
  }

  deleteTaskByTaskID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const taskID = req.params.taskID

    new SuccessResponse({
      message: "Delete task success.",
      metadata: await ProjectService.deleteTaskByTaskID(req, taskID),
    }).send(res, {})
  }
}
export default new ProjectController()