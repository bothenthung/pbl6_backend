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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entity/user.entity");
const project_entity_1 = require("../entity/project.entity");
class Invitation {
    constructor() {
        this.inviteUserToProject = (req) => __awaiter(this, void 0, void 0, function* () {
            const { projectID, userSendId, userReceiveId } = req.body;
            const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
            const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
            const invitationRepository = data_source_1.AppDataSource.getRepository(Invitation);
            const sender = yield userRepository.findOne(userSendId);
            const receiver = yield userRepository.findOne(userReceiveId);
            const project = yield projectRepository.findOne(projectID);
            if (!sender || !receiver || !project) {
                throw new Error('Sender, receiver, or project not found');
            }
            // const newInvitation = invitationRepository.create({
            //   userSend: sender as User,
            //   receiver: receiver as User,
            //   project: project as Project,
            //   status: 'pending', // You can set the initial status here
            // });
            return {};
        });
    }
}
exports.default = new Invitation();
