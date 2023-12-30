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
exports.socketServices = void 0;
const user_utils_1 = require("../utils/user.utils");
const message_service_1 = require("./message.service");
const listUser = new Map();
const socketServices = (socket) => {
    socket.on('join-room-chat', (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let roomName = user.projectID + 'group-chat';
            if (user.userID2) {
                roomName = user.projectID + (0, user_utils_1.sortId)(user.userID1, user.userID2);
            }
            console.log("roomName", roomName);
            listUser.set(socket.id, user);
            socket.join(roomName);
        }
        catch (err) {
            console.log(err.message);
        }
    }));
    socket.on('send-message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const message = yield message_service_1.messageService.create(data);
            let roomName = message.projectID + 'group-chat';
            if (message.userReceiveId) {
                roomName = message.projectID + (0, user_utils_1.sortId)(message.userSendId, message.userReceiveId);
            }
            const messageRes = yield message_service_1.messageService.getLatestMessagePersonal({
                userSendId: message.userSendId,
                userReceiveId: message.userReceiveId,
                projectID: message.projectID,
            });
            global.socket.to(roomName).emit('receive-message', messageRes);
        }
        catch (err) {
            console.log(err.message);
        }
    }));
    // socket.on('update-seen', async (data: IOnRoom) => {
    //     try {
    //         const user = listUser.get(socket.id);
    //         listUser.set(socket.id, { ...user, ...data });
    //         if (user.role === 'USER') {
    //             await userService.updateLastSeen(
    //                 new Date(),
    //                 user.id
    //             );
    //             global.socket.emit(`USER${user.id}`, data);
    //         }
    //         else {
    //             await adminService.updateLastSeen(
    //                 new Date(),
    //                 user.id
    //             );
    //             global.socket.emit(`RECEPTIONIST${user.id}`, data);
    //         }
    //     }
    //     catch (err) {
    //         console.log(err.message);
    //     }
    // });
    socket.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = listUser.get(socket.id);
            //     await userService.updateLastSeen()
            listUser.delete(socket.id);
        }
        catch (err) {
            console.log(err.message);
        }
    }));
};
exports.socketServices = socketServices;
