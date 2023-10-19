import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Note } from "../entity/note.entity"
import { getInfoData } from "../utils/getInfoData"
import { findNoteById } from "../utils/note.utils"
import { checkusernote } from "../utils/checkusernote"
import { ErrorResponse } from "../core/error.response"
import { BAD_REQUEST } from "../utils/statusCodes"

class NoteService {
  getAllNoteByUserID = async (userID: string) => {
    const notes = await AppDataSource.createQueryBuilder(Note, "note")
      .where("note.user = :userId", { userId: userID })
      .getMany()

    return { notes }
  }

  getNoteByID = async (noteID: string, userID: string) => {
    const note = await AppDataSource.createQueryBuilder(Note, "note")
      .where(" noteID = :noteId AND note.user = :userId", {
        userId: userID,
        noteId: noteID,
      })
      .getOne()
    if (!note) {
      throw new ErrorResponse(
        "No notes were find or invalid noteID",
        BAD_REQUEST
      )
    }

    return { note }
  }

  createNote = async (userId: any, note: any) => {
    const savedNote = await AppDataSource.getRepository(Note).save({
      title: note.title,
      content: note.content,
      user: userId,
    })
    return {
      note: getInfoData({
        fields: ["noteID", "title", "created_at"],
        dataObject: savedNote,
      }),
    }
  }

  updateNote = async (userId: any, note: any) => {
    const existingNote = await AppDataSource.createQueryBuilder(Note, "note")
      .where("note.noteID = :noteId", { noteId: note.noteID })
      .andWhere("note.user = :userId", { userId: userId })
      .getOne()
    if (!existingNote) {
      throw new ErrorResponse(
        "Invalid noteID or it does not belong to the current user.",
        400
      )
    }

    await AppDataSource.createQueryBuilder()
      .update(Note)
      .set({ title: note.title, content: note.content })
      .where("userID = :userId AND noteID = :noteId", {
        userId: userId,
        noteId: note.noteID,
      })
      .execute()

    const updateNote = await findNoteById(note.noteID)
    return {
      note: getInfoData({
        fields: ["noteID", "title", "content", "created_at", "updated_at"],
        dataObject: updateNote,
      }),
    }
  }

  deleteByNoteID = async (userId: any, { noteID }: { noteID: string[] }) => {
    const deleteResult = await AppDataSource.createQueryBuilder()
      .delete()
      .from(Note)
      .where("noteID IN (:...noteIDs) AND userID = :userId", {
        noteIDs: noteID,
        userId: userId,
      })
      .execute()

    if (deleteResult.affected === 0) {
      throw new ErrorResponse("No notes were deleted or invalid noteIDs.", 400)
    }

    return { quantity_deleted: deleteResult.affected }
  }
}
export default new NoteService()
