import { NextFunction, Request, Response } from "express"
import { SuccessResponse } from "../core/success.reponse"
import noteService from "../service/note.service"
import { HEADER } from "../utils/auth"

class NoteController {
  static getAllNoteByUserID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userIdString = req.headers[HEADER.CLIENT_KEY]?.toString()
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
    const userIdString = req.headers[HEADER.CLIENT_KEY]?.toString()
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
    new SuccessResponse({
      message: "Created note success!",
      metadata: await noteService.createNote(req.user, req.body),
    }).send(res, {})
  }

  static updateNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Update note success!",
      metadata: await noteService.updateNote(req.user, req.body),
    }).send(res, {})
  }

  static deleteNoteByID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Delete success!",
      metadata: await noteService.deleteByNoteID(req.user, req.body),
    }).send(res, {})
  }
}
export default NoteController
