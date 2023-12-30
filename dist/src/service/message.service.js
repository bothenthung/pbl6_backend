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
const data_source_1 = require("../data-source");
const message_entity_1 = require("../entity/message.entity");
const userProject_entity_1 = require("../entity/userProject.entity");
const pagination_1 = require("../utils/pagination");
exports.messageService = {
    create: (message) => __awaiter(void 0, void 0, void 0, function* () {
        const messageRepository = data_source_1.AppDataSource.getRepository(message_entity_1.MessageEntity);
        const newMessage = messageRepository.create(message);
        const savedMessage = yield messageRepository.save(newMessage);
        return savedMessage;
    }),
    getLatestMessagePersonal: (params) => __awaiter(void 0, void 0, void 0, function* () {
        const messageRepository = data_source_1.AppDataSource.getRepository(message_entity_1.MessageEntity);
        // const latestMessageWithUserInfo = await messageRepository
        //   .createQueryBuilder("message")
        //   .leftJoinAndSelect("message.userSend", "userSend")
        //   .leftJoinAndSelect("message.userReceive", "userReceive")
        //   .where(
        //     "((message.userSendId = :userSendId AND message.userReceiveId = :userReceiveId) OR (message.userSendId = :userReceiveId AND message.userReceiveId = :userSendId))",
        //     { userSendId: params.userSendId, userReceiveId: params.userReceiveId }
        //   )
        //   .andWhere("message.projectID = :projectID", { projectID: params.projectID })
        //   .orderBy("message.createdAt", "DESC")
        //   .getOne();
        const queryBuilder = messageRepository
            .createQueryBuilder("message")
            .leftJoinAndSelect("message.userSend", "userSend")
            .leftJoinAndSelect("message.userReceive", "userReceive")
            .where("message.projectID = :projectID", { projectID: params.projectID })
            .orderBy("message.createdAt", "DESC");
        if (params.userReceiveId !== null) {
            queryBuilder.andWhere("((message.userSendId = :userSendId AND message.userReceiveId = :userReceiveId) OR (message.userSendId = :userReceiveId AND message.userReceiveId = :userSendId))", { userSendId: params.userSendId, userReceiveId: params.userReceiveId });
        }
        else {
            queryBuilder.andWhere("message.userReceiveId IS NULL");
        }
        const latestMessageWithUserInfo = yield queryBuilder.getOne();
        return latestMessageWithUserInfo || null;
    }),
    getMany: (req, paginationInfo) => __awaiter(void 0, void 0, void 0, function* () {
        const messageRepository = data_source_1.AppDataSource.getRepository(message_entity_1.MessageEntity);
        let messagesBetweenUsers;
        const usersInProject = yield data_source_1.AppDataSource.getRepository(userProject_entity_1.UserProject)
            .createQueryBuilder("userProject")
            .select("userProject.userID")
            .where("userProject.projectID = :projectID", { projectID: req.query.projectID })
            .getQuery();
        if (req.query.userReceiveId) {
            messagesBetweenUsers = yield messageRepository
                .createQueryBuilder("message")
                .leftJoinAndSelect("message.userSend", "userSend")
                .leftJoinAndSelect("message.userReceive", "userReceive")
                .where("(message.userSendId = :userSendId AND message.userReceiveId = :userReceiveId) OR (message.userSendId = :userReceiveId AND message.userReceiveId = :userSendId)")
                .andWhere("message.projectID = :projectID", { userSendId: req.query.userSendId, userReceiveId: req.query.userReceiveId, projectID: req.query.projectID })
                .orderBy("message.createdAt", "DESC");
        }
        else {
            messagesBetweenUsers = yield messageRepository
                .createQueryBuilder("message")
                .leftJoinAndSelect("message.userSend", "userSend")
                .leftJoinAndSelect("message.userReceive", "userReceive")
                .where(`message.userSendId IN (${usersInProject})`)
                .andWhere("message.userReceiveId IS NULL")
                .andWhere("message.projectID = :projectID", { projectID: req.query.projectID });
        }
        const messages = (0, pagination_1.pagination)(messagesBetweenUsers, paginationInfo);
        return messages;
    }),
    getOne: ({ projectID, id }) => __awaiter(void 0, void 0, void 0, function* () {
        const messages = yield data_source_1.AppDataSource.getRepository(message_entity_1.MessageEntity)
            .createQueryBuilder("message")
            .leftJoinAndSelect('message.user', 'user')
            .leftJoinAndSelect('message.project', 'project')
            .where('project.projectID = :projectID', { projectID })
            .where('message.id = :id', { id })
            .select([
            'message.createdAt',
            'message.id',
            'message.message',
            'project.projectID',
            'user.userName',
            'user.userID',
        ])
            .getOne();
        return messages;
    }),
};
