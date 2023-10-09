import { NextFunction, Request, Response } from "express"
import authService from "../service/auth.service"
import { OK, CREATED, SuccessResponse } from "../core/success.reponse"

class AuthController {
  handleRefreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Refresh Token success ",
      metadata: await authService.handlerRefreshToken(req.refreshToken),
    }).send(res, {})
  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "logout success ",
      metadata: await authService.logout(req.user),
    }).send(res, {})
  }

  signup = async (req: Request, res: Response, next: NextFunction) => {
    new CREATED({
      message: "User created successfully",
      metadata: await authService.signup(req.body),
    }).send(res, {})
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    new OK({
      message: "Login success!",
      metadata: await authService.login(req.body),
    }).send(res, {})
  }
}

export default new AuthController()
