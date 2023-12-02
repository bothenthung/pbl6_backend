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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const success_reponse_1 = require("../core/success.reponse");
const message_service_1 = require("../service/message.service");
class MessageController {
}
_a = MessageController;
MessageController.getListMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationInfo = {
        orderType: 'DESC',
        orderBy: 'message.createdAt',
        page: req.query.page ? +req.query.page : -1,
        itemsPerPage: req.query.itemsPerPage ? +req.query.itemsPerPage : 10
    };
    new success_reponse_1.SuccessResponse({
        message: "Get user success!",
        metadata: yield message_service_1.messageService.getMany(req.query.projectID, paginationInfo),
    }).send(res, {});
});
exports.default = MessageController;
