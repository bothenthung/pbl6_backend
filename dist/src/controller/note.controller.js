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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const success_reponse_1 = require("../core/success.reponse");
const note_service_1 = __importDefault(require("../service/note.service"));
const auth_1 = require("../utils/auth");
class NoteController {
}
_a = NoteController;
NoteController.getAllNoteByUserID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userIdString = (_b = req.headers[auth_1.HEADER.CLIENT_KEY]) === null || _b === void 0 ? void 0 : _b.toString();
    new success_reponse_1.SuccessResponse({
        message: "Get all note success!",
        metadata: yield note_service_1.default.getAllNoteByUserID(userIdString),
    }).send(res, {});
});
NoteController.getNoteByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userIdString = (_c = req.headers[auth_1.HEADER.CLIENT_KEY]) === null || _c === void 0 ? void 0 : _c.toString();
    new success_reponse_1.SuccessResponse({
        message: "Get note success!",
        metadata: yield note_service_1.default.getNoteByID(req.params.id, userIdString),
    }).send(res, {});
});
NoteController.createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    new success_reponse_1.SuccessResponse({
        message: "Created note success!",
        metadata: yield note_service_1.default.createNote(req.user, req.body),
    }).send(res, {});
});
NoteController.updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    new success_reponse_1.SuccessResponse({
        message: "Update note success!",
        metadata: yield note_service_1.default.updateNote(req.user, req.body),
    }).send(res, {});
});
NoteController.deleteNoteByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    new success_reponse_1.SuccessResponse({
        message: "Delete success!",
        metadata: yield note_service_1.default.deleteByNoteID(req.user, req.body),
    }).send(res, {});
});
exports.default = NoteController;
