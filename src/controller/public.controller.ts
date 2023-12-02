import { NextFunction, Request, Response } from "express"
import { SuccessResponse } from "../core/success.reponse"
import PublicService from "../service/public.service"

class PublicController {
  checkEmailUser = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      message: "Check email success.",
      metadata: await PublicService.checkEmailUser(req.body.email),
    })
  }
}
export default new PublicController()
