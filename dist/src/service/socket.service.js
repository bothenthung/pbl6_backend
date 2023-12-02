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
const message_service_1 = require("./message.service");
const listUser = new Map();
const socketServices = (socket) => {
    socket.on('join', (user) => {
        try {
            listUser.set(socket.id, user);
            socket.join(String(user.projectID));
        }
        catch (err) {
            console.log(err.message);
        }
    });
    socket.on('send-message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const message = yield message_service_1.messageService.create(data);
            const messageRes = yield message_service_1.messageService.getOne(message.id);
            console.log({ messageRes });
            global.socket.to(String(data.projectID)).emit('receive-message', messageRes);
        }
        catch (err) {
            console.log(err.message);
        }
    }));
    // socket.on('send-message', async (data: IMessage) => {
    //     try {
    //         const message = await messageService.create({
    //             userId: +data.userId || null,
    //             content: data.content,
    //             roomChatId: +data.hotelId,
    //             receptionistId: +data.receptionistId || null
    //         } as MessagesEntity);
    //         const messageRes = await messageService.getOne(message.id);
    //         global.socket.to(String(data.hotelId))
    //             .emit('receive-message', messageFormat(messageRes));
    //         deviceTokenService.getManyByRoomId(data.hotelId).then((devices) => {
    //             const listId = new Map();
    //             const arrUsers: IJoinRoom[] = Array.from(listUser.values());
    //             arrUsers.map((user: IJoinRoom) => {
    //                 if (user.onRoom) {
    //                     listId.set(user.id, user.id);
    //                 }
    //             });
    //             const tokenDevices: string[] = [];
    //             devices.map(device => {
    //                 if (device.userId !== messageRes.userId) {
    //                     !listId.get(device.userId)
    //                         && tokenDevices.push(device.token);
    //                 }
    //             });
    //             firebaseSendMulticast(tokenDevices, {
    //                 notification: {
    //                     title: messageRes.user?.name
    //                         || messageRes.receptionist?.name,
    //                     body: messageRes.content,
    //                 },
    //                 data: {
    //                     content: messageRes.content
    //                 }
    //             });
    //         });
    //     }
    //     catch (err) {
    //         console.log(err.message);
    //     }
    // });
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
            // if (user.role === 'USER') {
            //     await userService.updateLastSeen(
            //         new Date(),
            //         user.id
            //     );
            // }
            // else {
            //     await adminService.updateLastSeen(
            //         new Date(),
            //         user.id
            //     );
            // }
            listUser.delete(socket.id);
        }
        catch (err) {
            console.log(err.message);
        }
    }));
};
exports.socketServices = socketServices;
