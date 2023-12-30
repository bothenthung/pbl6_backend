"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invitationRouter = void 0;
const express_1 = require("express");
const invitation_controller_1 = __importDefault(require("../../controller/invitation.controller"));
const asyncHandler_1 = require("../../utils/asyncHandler");
exports.invitationRouter = (0, express_1.Router)();
exports.invitationRouter.post("/", (0, asyncHandler_1.asyncHandler)(invitation_controller_1.default.inviteUserToProject));
