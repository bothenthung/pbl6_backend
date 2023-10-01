"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../../controller/auth.controller"));
exports.authRouter = express_1.default.Router();
//sign up
exports.authRouter.post("/user/signup", auth_controller_1.default.signup);
