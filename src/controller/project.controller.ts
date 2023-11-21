import { NextFunction, Request, Response } from "express"
import { SuccessResponse } from "../core/success.reponse"
import ProjectService from "../service/project.service"

class ProjectController {
  createProject = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Create project success.",
      metadata: await ProjectService.createProject(req.user, req.body),
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
}
export default new ProjectController()
