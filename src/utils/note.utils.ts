import { AppDataSource } from "../data-source"
import { Note } from "../entity/note.entity"

export const findNoteById = async (noteID: number) => {
  return await AppDataSource.getRepository(Note).findOneBy({ noteID })
}
