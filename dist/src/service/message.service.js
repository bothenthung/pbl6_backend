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
exports.messageService = void 0;
const error_response_1 = require("../core/error.response");
const data_source_1 = require("../data-source");
const message_entity_1 = require("../entity/message.entity");
const project_entity_1 = require("../entity/project.entity");
const user_entity_1 = require("../entity/user.entity");
const pagination_1 = require("../utils/pagination");
exports.messageService = {
    create: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const [user, project] = yield Promise.all([
            data_source_1.AppDataSource.getRepository(user_entity_1.User).findOneBy({
                userID: message.userID,
            }),
            data_source_1.AppDataSource.getRepository(project_entity_1.Project).findOneBy({
                projectID: message.projectID
            })
        ]);
        if (!user)
            throw new error_response_1.ErrorResponse("Invalid User", 400);
        if (!project)
            throw new error_response_1.ErrorResponse("Invalid Project", 400);
        const messageRepo = data_source_1.AppDataSource.getRepository(message_entity_1.MessageEntity);
        const newTask = messageRepo.create({
            message: message.message,
            user,
            project,
        });
        return newTask;
    }),
    getMany: (projectID, paginationInfo) => __awaiter(void 0, void 0, void 0, function* () {
        // const messages = await .getMany(roomChatId, paginationInfo);
        console.log({
            x: yield data_source_1.AppDataSource.getRepository(message_entity_1.MessageEntity).count(),
            y: "vai cadasdas vai cadasdasvai cadasdasvai cadasdasvai cadasdasvai cadasdasvai cadasdasvai cadasdasvai cadasdas"
        });
        const entity = yield data_source_1.AppDataSource.getRepository(message_entity_1.MessageEntity).createQueryBuilder('message')
            .where("project.projectID = :projectID", {
            projectID: projectID,
        })
            .leftJoinAndSelect('message.user', 'user')
            .leftJoinAndSelect('message.project', 'project')
            .select([
            'message.message',
            'user.userName',
        ]);
        const messages = (0, pagination_1.pagination)(entity, paginationInfo);
        return messages;
    }),
    getOne: (projectID) => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield data_source_1.AppDataSource.getRepository(message_entity_1.MessageEntity)
            .createQueryBuilder("message")
            .where("projectID = :projectID", {
            projectID: projectID,
        })
            .getOne();
        return messages;
    }),
};
