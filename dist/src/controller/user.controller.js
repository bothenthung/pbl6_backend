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
class UserController {
}
_a = UserController;
UserController.getUserByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdString = (0, auth_1.getUserIDString)(req);
    const username = req.params.username;
    new success_reponse_1.SuccessResponse({
        message: "Get user success!",
        metadata: yield user_service_1.default.getUserByUserName(username, userIdString),
    }).send(res, {});
});
UserController.getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationInfo = {
        orderType: 'DESC',
        orderBy: 'user.email',
        page: req.query.page ? +req.query.page : -1,
        itemsPerPage: req.query.itemsPerPage ? +req.query.itemsPerPage : 10,
    };
    new success_reponse_1.SuccessResponse({
        message: "Get user success!",
        metadata: yield user_service_1.default.getAllUserPagination(req, paginationInfo),
    }).send(res, {});
});
UserController.verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    new success_reponse_1.SuccessResponse({
        message: "Get user success!",
        metadata: yield user_service_1.default.verifyEmail(req),
    }).send(res, {});
});
UserController.updateUserByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdString = (0, auth_1.getUserIDString)(req);
    new success_reponse_1.SuccessResponse({
        message: "Update user success!",
        metadata: yield user_service_1.default.updateUserByID(req.body, userIdString),
    }).send(res, {});
});
exports.default = UserController;
