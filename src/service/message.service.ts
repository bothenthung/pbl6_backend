import { ErrorResponse } from '../core/error.response';
import { AppDataSource } from '../data-source';
import { MessageEntity } from '../entity/message.entity';
import { Project } from '../entity/project.entity';
import { User } from '../entity/user.entity';
import { IMessage } from '../types/socket';
import { IQueryOptions, pagination } from '../utils/pagination';

export const messageService = {

  create: async (message: IMessage) => {
    const [user, project] = await Promise.all([
      AppDataSource.getRepository(User).findOneBy({
        userID: message.userID,
      }),
      AppDataSource.getRepository(Project).findOneBy({
        projectID: message.projectID
      })
    ])

    if (!user) throw new ErrorResponse("Invalid User", 400);
    if (!project) throw new ErrorResponse("Invalid Project", 400);
    
      const messageRepo = AppDataSource.getRepository(MessageEntity)
  
      const newMessage = messageRepo.create({
        message: message.message,
        user,
        project,
      })
    
      const saveMessage = await messageRepo.save(newMessage);

      return saveMessage;
  },

  getMany: async (projectID: string, paginationInfo: IQueryOptions) => {
    const entity = await AppDataSource.getRepository(MessageEntity).createQueryBuilder('message')
    .leftJoinAndSelect('message.user', 'user')
    .leftJoinAndSelect('message.project', 'project')
    .where('project.projectID = :projectID', { projectID })
    .select([
      'message.createdAt',
      'message.id',
      'message.message',
      'project.projectID',
      'user.userName',
      'user.userID',
    ])

  const messages = pagination(entity, paginationInfo);
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
