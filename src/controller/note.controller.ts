import { NextFunction, Request, Response } from "express"
import { SuccessResponse } from "../core/success.reponse"
import noteService from "../service/note.service"
import { getUserIDString } from "../utils/auth"

class NoteController {
  static getAllNoteByUserID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userIdString = getUserIDString(req)
    new SuccessResponse({
      message: "Get all note success!",
      metadata: await noteService.getAllNoteByUserID(userIdString),
    }).send(res, {})
  }

  static getNoteByID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userIdString = getUserIDString(req)
    new SuccessResponse({
      message: "Get note success!",
      metadata: await noteService.getNoteByID(req.params.id, userIdString),
    }).send(res, {})
  }

  static createNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userIdString = getUserIDString(req)

    new SuccessResponse({
      message: "Created note success!",
      metadata: await noteService.createNote(userIdString, req.body),
    }).send(res, {})
  }

  static updateNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userIdString = getUserIDString(req)

    new SuccessResponse({
      message: "Update note success!",
      metadata: await noteService.updateNote(userIdString, req.body),
    }).send(res, {})
  }

  static deleteNoteByID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userIdString = getUserIDString(req)

    new SuccessResponse({
      message: "Delete success!",
      metadata: await noteService.deleteByNoteID(userIdString, req.body),
    }).send(res, {})
  }
}
export default NoteController
