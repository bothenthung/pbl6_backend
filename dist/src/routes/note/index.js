"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRouter = void 0;
const express_1 = __importDefault(require("express"));
const note_controller_1 = __importDefault(require("../../controller/note.controller"));
const asyncHandler_1 = require("../../utils/asyncHandler");
exports.noteRouter = express_1.default.Router();
exports.noteRouter.get("/getallnote", (0, asyncHandler_1.asyncHandler)(note_controller_1.default.getAllNoteByUserID));
exports.noteRouter.get("/:id", (0, asyncHandler_1.asyncHandler)(note_controller_1.default.getNoteByID));
exports.noteRouter.post("/createnote", (0, asyncHandler_1.asyncHandler)(note_controller_1.default.createNote));
exports.noteRouter.patch("/updatenote", (0, asyncHandler_1.asyncHandler)(note_controller_1.default.updateNote));
exports.noteRouter.delete("/deletenote", (0, asyncHandler_1.asyncHandler)(note_controller_1.default.deleteNoteByID));
