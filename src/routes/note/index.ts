import express from "express"
import noteController from "../../controller/note.controller"
import { asyncHandler } from "../../utils/asyncHandler"
export const noteRouter = express.Router()

noteRouter.get(
  "/getallnote",
  asyncHandler(noteController.getAllNoteByUserID) as any
)
noteRouter.get("/:id", asyncHandler(noteController.getNoteByID) as any)
noteRouter.post("/createnote", asyncHandler(noteController.createNote) as any)
noteRouter.patch("/updatenote", asyncHandler(noteController.updateNote) as any)
noteRouter.delete(
  "/deletenote",
  asyncHandler(noteController.deleteNoteByID) as any
)
