"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const note_entity_1 = require("../entity/note.entity");
const getInfoData_1 = require("../utils/getInfoData");
const note_utils_1 = require("../utils/note.utils");
const error_response_1 = require("../core/error.response");
const statusCodes_1 = require("../utils/statusCodes");
class NoteService {
    constructor() {
        this.getAllNoteByUserID = (userID) => __awaiter(this, void 0, void 0, function* () {
            const notes = yield data_source_1.AppDataSource.createQueryBuilder(note_entity_1.Note, "note")
                .where("note.user = :userId", { userId: userID })
                .getMany();
            return { notes };
        });
        this.getNoteByID = (noteID, userID) => __awaiter(this, void 0, void 0, function* () {
            const note = yield data_source_1.AppDataSource.createQueryBuilder(note_entity_1.Note, "note")
                .where(" noteID = :noteId AND note.user = :userId", {
                userId: userID,
                noteId: noteID,
            })
                .getOne();
            if (!note) {
                throw new error_response_1.ErrorResponse("No notes were find or invalid noteID", statusCodes_1.BAD_REQUEST);
            }
            return { note };
        });
        this.createNote = (userId, note) => __awaiter(this, void 0, void 0, function* () {
            const savedNote = yield data_source_1.AppDataSource.getRepository(note_entity_1.Note).save({
                title: note.title,
                content: note.content,
                user: userId,
            });
            return {
                note: (0, getInfoData_1.getInfoData)({
                    fields: ["noteID", "title", "created_at"],
                    dataObject: savedNote,
                }),
            };
        });
        this.updateNote = (userId, note) => __awaiter(this, void 0, void 0, function* () {
            const existingNote = yield data_source_1.AppDataSource.createQueryBuilder(note_entity_1.Note, "note")
                .where("note.noteID = :noteId", { noteId: note.noteID })
                .andWhere("note.user = :userId", { userId: userId })
                .getOne();
            if (!existingNote) {
                throw new error_response_1.ErrorResponse("Invalid noteID or it does not belong to the current user.", 400);
            }
            yield data_source_1.AppDataSource.createQueryBuilder()
                .update(note_entity_1.Note)
                .set({ title: note.title, content: note.content })
                .where("userID = :userId AND noteID = :noteId", {
                userId: userId,
                noteId: note.noteID,
            })
                .execute();
            const updateNote = yield (0, note_utils_1.findNoteById)(note.noteID);
            return {
                note: (0, getInfoData_1.getInfoData)({
                    fields: ["noteID", "title", "content", "created_at", "updated_at"],
                    dataObject: updateNote,
                }),
            };
        });
        this.deleteByNoteID = (userId, { noteID }) => __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield data_source_1.AppDataSource.createQueryBuilder()
                .delete()
                .from(note_entity_1.Note)
                .where("noteID IN (:...noteIDs) AND userID = :userId", {
                noteIDs: noteID,
                userId: userId,
            })
                .execute();
            if (deleteResult.affected === 0) {
                throw new error_response_1.ErrorResponse("No notes were deleted or invalid noteIDs.", 400);
            }
            return { quantity_deleted: deleteResult.affected };
        });
    }
}
exports.default = new NoteService();
