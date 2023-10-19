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
const user_service_1 = __importDefault(require("../service/user.service"));
const auth_1 = require("../utils/auth");
const error_response_1 = require("../core/error.response");
class UserController {
}
_a = UserController;
UserController.getUserByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userIdString = (_b = req.headers[auth_1.HEADER.CLIENT_KEY]) === null || _b === void 0 ? void 0 : _b.toString();
    if (!userIdString)
        throw new error_response_1.ErrorResponse("Id bi loi mat tieu", 400);
    const username = req.params.username;
    new success_reponse_1.SuccessResponse({
        message: "Get user success!",
        metadata: yield user_service_1.default.getUserByUserName(username, userIdString),
    }).send(res, {});
});
UserController.updateUserByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userIdString = (_c = req.headers[auth_1.HEADER.CLIENT_KEY]) === null || _c === void 0 ? void 0 : _c.toString();
    new success_reponse_1.SuccessResponse({
        message: "Update user success!",
        metadata: yield user_service_1.default.updateUserByID(req.body, userIdString),
    }).send(res, {});
});
UserController.deleteUserByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const userIdString = (_d = req.headers[auth_1.HEADER.CLIENT_KEY]) === null || _d === void 0 ? void 0 : _d.toString();
    new success_reponse_1.SuccessResponse({
        message: "Delete user success!",
        metadata: yield user_service_1.default.deleteUserByID(userIdString),
    }).send(res, {});
});
exports.default = UserController;
