import { IJoinRoom, IMessage } from "../types/socket";
import { messageService } from "./message.service";

const listUser = new Map<string, IJoinRoom>();

export const socketServices = (socket: any) => {
  socket.on('join', (user: IJoinRoom) => {
    try {
      listUser.set(socket.id, user);
      socket.join(String(user.projectID));
  }
  catch (err: any) {
      console.log(err.message);
  }
  });


  socket.on('send-message', async (data: IMessage) => {
    try {
      const message = await messageService.create(data);
      // const messageRes = await messageService.getOne({projectID: data.projectID , id: message.id});

        // (global as any).socket.to(String(data.projectID)).emit('receive-message', messageRes);
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
