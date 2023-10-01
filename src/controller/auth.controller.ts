import { NextFunction, Request, Response } from "express"
import authService from "../service/auth.service"

class AuthController {
  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.signup(req.body)
      return res.status(200).json({
        result,
        message: "loi",
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default new AuthController()
