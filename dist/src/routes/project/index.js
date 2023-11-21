"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const project_controller_1 = __importDefault(require("../../controller/project.controller"));
exports.projectRouter = express_1.default.Router();
exports.projectRouter.post("/createproject", (0, asyncHandler_1.asyncHandler)(project_controller_1.default.createProject));
exports.projectRouter.post("/getallproject", (0, asyncHandler_1.asyncHandler)(project_controller_1.default.getAllProjectByUserID));
exports.projectRouter.post("/addusertoproject", (0, asyncHandler_1.asyncHandler)(project_controller_1.default.addUserToProject));
