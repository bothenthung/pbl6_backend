import { AppDataSource } from '../data-source';
import { MessageEntity } from '../entity/message.entity';
import { UserProject } from '../entity/userProject.entity';
import { IQueryOptions, pagination } from '../utils/pagination';

export const messageService = {

  create: async (message: any) => {
      const messageRepository = AppDataSource.getRepository(MessageEntity)
      const newMessage = messageRepository.create(message);
      const savedMessage = await messageRepository.save(newMessage);
      return savedMessage;
  },

  getLatestMessagePersonal: async (params: any) => {
    const messageRepository = AppDataSource.getRepository(MessageEntity);

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
        queryBuilder.andWhere(
          "((message.userSendId = :userSendId AND message.userReceiveId = :userReceiveId) OR (message.userSendId = :userReceiveId AND message.userReceiveId = :userSendId))",
          { userSendId: params.userSendId, userReceiveId: params.userReceiveId }
        );
      } else {
        queryBuilder.andWhere("message.userReceiveId IS NULL");
      }

    const latestMessageWithUserInfo = await queryBuilder.getOne();

    return latestMessageWithUserInfo || null;
    },

  getMany: async (req: any, paginationInfo: IQueryOptions) => {

    const messageRepository = AppDataSource.getRepository(MessageEntity);
    let messagesBetweenUsers;

    const usersInProject = await AppDataSource.getRepository(UserProject)
      .createQueryBuilder("userProject")
      .select("userProject.userID")
      .where("userProject.projectID = :projectID", { projectID: req.query.projectID })
      .getQuery();

    if(req.query.userReceiveId) {
      messagesBetweenUsers = await messageRepository
      .createQueryBuilder("message")
      .leftJoinAndSelect("message.userSend", "userSend")
      .leftJoinAndSelect("message.userReceive", "userReceive")
      .where("(message.userSendId = :userSendId AND message.userReceiveId = :userReceiveId) OR (message.userSendId = :userReceiveId AND message.userReceiveId = :userSendId)")
      .andWhere("message.projectID = :projectID",
       { userSendId: req.query.userSendId as string, userReceiveId: req.query.userReceiveId as string, projectID: req.query.projectID as string })
      .orderBy("message.createdAt", "DESC")
    } else {
      messagesBetweenUsers = await messageRepository
      .createQueryBuilder("message")
      .leftJoinAndSelect("message.userSend", "userSend")
      .leftJoinAndSelect("message.userReceive", "userReceive")
      .where(`message.userSendId IN (${usersInProject})`)
      .andWhere("message.userReceiveId IS NULL")
      .andWhere("message.projectID = :projectID", { projectID: req.query.projectID })
    } 

    const messages = pagination(messagesBetweenUsers, paginationInfo);
    return messages;
  },

  getOne: async ({projectID , id} :{projectID: string , id: string }) => {

    const messages = await AppDataSource.getRepository(MessageEntity)
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
    .getOne()
    

    return messages;
  },
};
