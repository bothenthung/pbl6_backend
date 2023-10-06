import { NextFunction, Request, Response } from "express"
import authService from "../service/auth.service"
import { OK, CREATED } from "../core/success.reponse"

class AuthController {
  // logout = async (req: Request, res: Response, next: NextFunction) => {
  //   new OK({
  //     message: "logout success ",
  //     metadata: await authService.logout(req.user),
  //   }).send(res, {})
  // }

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
