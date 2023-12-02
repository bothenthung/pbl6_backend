export type IJoinRoom = {
  userID: string
  projectID: string
}

export interface IMessage {
  userID: string;
  projectID: string;
  message: string;
}