import { NextFunction, Request, Response } from "express"
import { SuccessResponse } from "../core/success.reponse"
import spellcorrectionService from "../service/spellcorrection.service"
import { ErrorResponse } from "../core/error.response"

class SpellCorrectionController {
  static spellcorrection = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.file) {
      const fileBuffer = req.file.buffer
      const fileText = fileBuffer.toString("utf-8")
      new SuccessResponse({
        message: "spell correction success",
        metadata: await spellcorrectionService.textCorrection(fileText),
      }).send(res, {})
    } else if (req.body.content) {
      console.log("hehe")
    }
  }
}
export default SpellCorrectionController
