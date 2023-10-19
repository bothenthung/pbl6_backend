import { AppDataSource } from "../data-source"
import { Note } from "../entity/note.entity"

export const checkusernote = async (noteId: number, userId: number) => {
  const existingNote = await AppDataSource.createQueryBuilder(Note, "note")
    .where("note.noteID = :noteId", { noteId: noteId })
    .andWhere("note.user = :userId", { userId: userId })
    .getOne()

  return existingNote
}
