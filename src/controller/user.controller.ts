import { NextFunction, Request, Response } from "express"
import { SuccessResponse } from "../core/success.reponse"
import userService from "../service/user.service"
import { HEADER } from "../utils/auth"
import { ErrorResponse } from "../core/error.response"

class UserController {
  static getUserByID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userIdString = req.headers[HEADER.CLIENT_KEY]?.toString()
    if (!userIdString) throw new ErrorResponse("Id bi loi mat tieu", 400)
    const username = req.params.username

    new SuccessResponse({
      message: "Get user success!",
      metadata: await userService.getUserByUserName(username, userIdString),
    }).send(res, {})
  }
  static updateUserByID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userIdString = req.headers[HEADER.CLIENT_KEY]?.toString()

    new SuccessResponse({
      message: "Update user success!",
      metadata: await userService.updateUserByID(req.body, userIdString),
    }).send(res, {})
  }

  static deleteUserByID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userIdString = req.headers[HEADER.CLIENT_KEY]?.toString()

    new SuccessResponse({
      message: "Delete user success!",
      metadata: await userService.deleteUserByID(userIdString),
    }).send(res, {})
  }
}

export default UserController
