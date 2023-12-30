import { NextFunction, Request, Response } from "express"
import { SuccessResponse } from "../core/success.reponse"
import { messageService } from "../service/message.service"
import { IQueryOptions } from "../utils/pagination"
import invitationService from "../service/invitation.service"

class invitationController {
  static inviteUserToProject = async (req: Request,res: Response) => {

    new SuccessResponse({
      message: "Get user success!",
      metadata: await invitationService.inviteUserToProject(req as any),
    }).send(res, {})
  }
}

export default invitationController
