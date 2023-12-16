export type IJoinRoom = {
  userID: string
  projectID: string
}

export type IJoinRoomChat = {
  userID1: string
  userID2: string
  projectID: string
}

export interface IMessage {
  userID: string;
  projectID: string;
  message: string;
}