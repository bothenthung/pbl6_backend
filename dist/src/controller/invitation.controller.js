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
const invitation_service_1 = __importDefault(require("../service/invitation.service"));
class invitationController {
}
_a = invitationController;
invitationController.inviteUserToProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    new success_reponse_1.SuccessResponse({
        message: "Get user success!",
        metadata: yield invitation_service_1.default.inviteUserToProject(req),
    }).send(res, {});
});
exports.default = invitationController;
