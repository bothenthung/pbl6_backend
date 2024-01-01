import { NextFunction, Request, Response } from "express"
import { SuccessResponse } from "../core/success.reponse"
import { getUserIDString } from "../utils/auth"
import { IQueryOptions } from "../utils/pagination"
import { catchAsync } from "../utils/asyncHandler";
import UserService from "../service/user.service";
import userService from "../service/user.service.deprecated";

class UserController {
  private service = new UserService();

  getAll = catchAsync(async (req, res) => {
    new SuccessResponse({
      message: "Get all project success.",
      metadata: await this.service.getAll(req.query),
    }).send(res);
  })

  // static getUserByID = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   const userIdString = getUserIDString(req)
  //   const username = req.params.username

  //   new SuccessResponse({
  //     message: "Get user success!",
  //     metadata: await userService.getUserByUserName(username, userIdString),
  //   }).send(res, {})
  // }

  // static getAllUser = async (
  //   req: Request,
  //   res: Response,
  // ) => {

  //   const paginationInfo: IQueryOptions = {
  //     orderType: 'DESC',
  //     orderBy: 'user.email',
  //     page: req.query.page ? +req.query.page : - 1,
  //     itemsPerPage: req.query.itemsPerPage ? +req.query.itemsPerPage : 10,
  //   };

  //   new SuccessResponse({
  //     message: "Get user success!",
  //     metadata: await userService.getAllUserPagination(req , paginationInfo),
  //   }).send(res, {})
  // }

  // static verifyEmail = async (
  //   req: Request,
  //   res: Response,
  // ) => {

  //   new SuccessResponse({
  //     message: "Get user success!",
  //     metadata: await userService.verifyEmail(req),
  //   }).send(res, {})
  // }

  // static updateUserByID = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   const userIdString = getUserIDString(req)
  //   new SuccessResponse({
  //     message: "Update user success!",
  //     metadata: await userService.updateUserByID(req.body, userIdString),
  //   }).send(res, {})
  // }

  // // static deleteUserByID = async (
  // //   req: Request,
  // //   res: Response,
  // //   next: NextFunction
  // // ) => {
  // //   const userIdString = getUserIDString(req)
  // //   new SuccessResponse({
  // //     message: "Delete user success!",
  // //     metadata: await userService.deleteUserByID(userIdString),
  // //   }).send(res, {})
  // // }
}

export default new UserController()
