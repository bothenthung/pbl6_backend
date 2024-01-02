import { MessageEntity } from "../entity/message.entity";
import { IJoinRoomChat } from "../types/socket";
import { sortId } from "../utils/user.utils";
import messageService from "./message.service";

const listUser = new Map<string, IJoinRoomChat>();

export const socketServices = (socket: any) => {
  socket.on('join-room-chat' , async (user: IJoinRoomChat) => {
    try {
      let roomName = user.projectID + 'group-chat';

      if(user.userID2) {
        roomName = user.projectID + sortId(user.userID1, user.userID2);
      }

      console.log("roomName" , roomName);

      listUser.set(socket.id, user);
      socket.join(roomName);
    } catch (err: any) {
      console.log(err.message);
    }
  })

  socket.on('send-message', async (data: Partial<MessageEntity>) => {
    try {
      const message = await messageService.create(data);

      let roomName = message.projectId + 'group-chat';

      if(message.receiverId) {
        roomName = message.projectId + sortId(message.senderId, message.receiverId);
      }

      const messageRes = await messageService.getLatest(message.id);

      (global as any).socket.to(roomName).emit('receive-message', messageRes);
    }
    catch (err: any) {
        console.log(err.message);
    }
});

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


  socket.on('disconnect', async () => {
    try {
        const user = listUser.get(socket.id);
        //     await userService.updateLastSeen()
        listUser.delete(socket.id);
    }
    catch (err: any) {
        console.log(err.message);
    }
});
};
