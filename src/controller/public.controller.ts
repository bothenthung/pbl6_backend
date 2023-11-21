import { NextFunction, Request, Response } from "express"
import { SuccessResponse } from "../core/success.reponse"
import PublicService from "../service/public.service"

class PublicController {
  checkEmailUser = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "Get all project success.",
      metadata: await PublicService.checkEmailUser(req.body.email),
    }).send(res, {})
  }
}
export default new PublicController()
