"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spellCorrectionRouter = void 0;
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const spellcorrection_controller_1 = __importDefault(require("../../controller/spellcorrection.controller"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
exports.spellCorrectionRouter = express_1.default.Router();
exports.spellCorrectionRouter.post("/", upload.single("file"), (0, asyncHandler_1.asyncHandler)(spellcorrection_controller_1.default.spellcorrection));
