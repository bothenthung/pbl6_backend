import { NextFunction, Request, Response } from "express";
import { CREATED, SuccessResponse } from "../core/success.reponse";
import ProjectService from "../service/project.service";
import userService from "../service/user.service.deprecated";
import { IQueryOptions } from "../utils/pagination";
import { catchAsync } from "../utils/asyncHandler";

class ProjectController {
  service = new ProjectService();

  create = catchAsync(async (req, res) => {
    new CREATED({
      message: "Create project success.",
      metadata: await this.service.create(req.user, req.body)
    }).send(res);
  });

  getAll = catchAsync(async (req, res) => {
    new SuccessResponse({
      message: "Get all project success.",
      metadata: await this.service.getAll(req.user, req.query),
    }).send(res);
  })
  
  get = catchAsync(async (req, res) => {
    new SuccessResponse({
      message: "Get project detail success.",
      metadata: await this.service.get(req.user, req.params),
    }).send(res);
  })
  
  invite = catchAsync(async (req, res) => {
    new SuccessResponse({
      message: "Invite success.",
      metadata: await this.service.invite(req.user, req.body),
    }).send(res);
  })

  getAllInvitation = catchAsync(async (req, res) => {
    new SuccessResponse({
      message: "Get all invitation success.",
      metadata: await this.service.getAllInvitation(req.user, req.query),
    }).send(res);
  })

  acceptInvitation = catchAsync(async (req, res) => {
    new SuccessResponse({
      message: "Accept invitation success.",
      metadata: await this.service.acceptInvitation(req.user, req.body),
    }).send(res);
  })

  createColumn = catchAsync(async (req, res) => {
    new SuccessResponse({
      message: "Create column success.",
      metadata: await this.service.createColumn(req.params, req.body),
    }).send(res);
  })

  getAllColumns = catchAsync(async (req, res) => {
    new SuccessResponse({
      message: "Get all columns success.",
      metadata: await this.service.getAllColumns(req.params),
    }).send(res);
  })

  /** @deprecated */
  addProject = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Create project success.",
      metadata: await ProjectService.addProject(req.user, req.body),
    }).send(res, {});
  };

  getAllProjectByUserID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Get all project success.",
      metadata: await ProjectService.getAllProjectByUserID(req.user),
    }).send(res, {});
  };

  deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    const projectID = req.params.projectID;
    new SuccessResponse({
      message: "Delete project success.",
      metadata: await ProjectService.deletePoject(projectID, req.user.userID),
    }).send(res, {});
  };

  getProjectDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // const projectID = req.params.projectID
    new SuccessResponse({
      message: "Get all project success.",
      metadata: await ProjectService.getProjectDetails(req.user.userID, req),
    }).send(res, {});
  };

  addUserToProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Add users success.",
      metadata: await ProjectService.addUserToProject(req),
    }).send(res, {});
  };

  addColumnToProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Add column success.",
      metadata: await ProjectService.addColumnToProject(req.body),
    }).send(res, {});
  };

  getAllColumn = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Get all columns success.",
      metadata: await ProjectService.getAllColumn(req.body.projectID),
    }).send(res, {});
  };

  deleteColumn = async (req: Request, res: Response, next: NextFunction) => {
    const columnID = req.params.columnID;
    new SuccessResponse({
      message: "Delete column success.",
      metadata: await ProjectService.deleteColumn(req, columnID),
    }).send(res, {});
  };

  changeIndexColumn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Change index column success.",
      metadata: await ProjectService.changeIndexColumn(req),
    }).send(res, {});
  };

  addTask = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Add task success.",
      metadata: await ProjectService.addTask(req),
    }).send(res, {});
  };

  getAllTask = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Get all tasks success.",
      metadata: await ProjectService.getAllTask(req),
    }).send(res, {});
  };

  changeIndexTask = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Change index task success.",
      metadata: await ProjectService.changeIndexTask(req),
    }).send(res, {});
  };

  deleteTaskByTaskID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const taskID = req.params.taskID;

    new SuccessResponse({
      message: "Delete task success.",
      metadata: await ProjectService.deleteTaskByTaskID(req, taskID),
    }).send(res, {});
  };

  getListUser = async (req: Request, res: Response) => {

    const paginationInfo: IQueryOptions = {
      orderType: 'DESC',
      orderBy: 'user.userName',
      page: req.query.page ? +req.query.page : - 1,
      itemsPerPage: req.query.itemsPerPage ? +req.query.itemsPerPage : 10
    };

    new SuccessResponse({
      message: "Get user success!",
      metadata: await userService.getListUserByProjectID(req, paginationInfo),
    }).send(res, {});
  };
}
export default new ProjectController();
