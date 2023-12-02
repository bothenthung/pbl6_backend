import { NextFunction, Request, Response } from "express"
import { SuccessResponse } from "../core/success.reponse"
import { messageService } from "../service/message.service"
import { IQueryOptions } from "../utils/pagination"

class MessageController {
  static getListMessage = async (
    req: Request,
    res: Response,
  ) => {

    const paginationInfo: IQueryOptions = {
      orderType: 'DESC',
      orderBy: 'message.createdAt',
      page: req.query.page ? +req.query.page : - 1,
      itemsPerPage: req.query.itemsPerPage ? +req.query.itemsPerPage : 10
    };

    new SuccessResponse({
      message: "Get user success!",
      metadata: await messageService.getMany(req.query.projectID as string, paginationInfo),
    }).send(res, {})
  }
}

export default MessageController
