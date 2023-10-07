"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../../controller/auth.controller"));
const asyncHandler_1 = require("../../utils/asyncHandler");
exports.authRouter = express_1.default.Router();
//sign up
exports.authRouter.post("/user/signup", (0, asyncHandler_1.asyncHandler)(auth_controller_1.default.signup));
exports.authRouter.post("/user/login", (0, asyncHandler_1.asyncHandler)(auth_controller_1.default.login));
