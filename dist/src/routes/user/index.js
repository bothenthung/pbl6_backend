"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controller/user.controller"));
const asyncHandler_1 = require("../../utils/asyncHandler");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get("/:username", (0, asyncHandler_1.asyncHandler)(user_controller_1.default.getUserByID));
exports.userRouter.patch("/updateuser", (0, asyncHandler_1.asyncHandler)(user_controller_1.default.updateUserByID));
exports.userRouter.get("/", (0, asyncHandler_1.asyncHandler)(user_controller_1.default.getAllUser));
exports.userRouter.post("/verify-email", (0, asyncHandler_1.asyncHandler)(user_controller_1.default.verifyEmail));
// userRouter.delete(
//   "/deleteuser",
//   asyncHandler(userController.deleteUserByID) as any
// )
