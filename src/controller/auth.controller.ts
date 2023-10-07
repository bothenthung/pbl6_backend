import { NextFunction, Request, Response } from "express"
import authService from "../service/auth.service"

class AuthController {
  signup = async (req: Request, res: Response, next: NextFunction) => {
    // try {
    return res.status(201).json(await authService.signup(req.body))
    // } catch (error) {
    //   console.log(error)
    // }
  }
}

export default new AuthController()
