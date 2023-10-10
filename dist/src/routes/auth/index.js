"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const auth_1 = require("../../utils/auth");
const auth_controller_1 = __importDefault(require("../../controller/auth.controller"));
exports.authRouter = express_1.default.Router();
exports.authRouter.post("/user/signup", (0, asyncHandler_1.asyncHandler)(auth_controller_1.default.signup));
exports.authRouter.post("/user/login", (0, asyncHandler_1.asyncHandler)(auth_controller_1.default.login));
exports.authRouter.post("/user/refreshtoken", auth_1.receiveRefreshToken, (0, asyncHandler_1.asyncHandler)(auth_controller_1.default.handleRefreshToken));
exports.authRouter.use(auth_1.authentication);
exports.authRouter.post("/user/logout", (0, asyncHandler_1.asyncHandler)(auth_controller_1.default.logout));
