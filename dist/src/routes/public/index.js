"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = require("express");
const asyncHandler_1 = require("../../utils/asyncHandler");
const public_controller_1 = __importDefault(require("../../controller/public.controller"));
exports.publicRouter = (0, express_1.Router)();
exports.publicRouter.post("/checkemail", (0, asyncHandler_1.asyncHandler)(public_controller_1.default.checkEmailUser));
