import { NotFoundError } from '../core/error.response';
import { MessageEntity } from '../entities/Message.entity';
import { UserEntity } from '../entities/User.entity';

class MessageService {
  async create(params: Partial<MessageEntity>) {
    const user = await UserEntity.findOneBy({ id: params.senderId })

    if(!user) throw new NotFoundError();

    const messageEntity = new MessageEntity();

    messageEntity.message = params.message as string;
    messageEntity.senderId = params.senderId as string;
    messageEntity.receiverId = params.receiverId as string;
    messageEntity.projectId = params.projectId as string;
    messageEntity.receiver = user;

    const newMessage = await messageEntity.save();
    return newMessage;
  }

  async getLatest(id: string) {
    const latestMessage = await MessageEntity.findOne({
      where: { id },
      order: {
        createdAt: 'DESC'
      },
      relations: {
        receiver: true
      }
    });

    return latestMessage;
  }
}

export default new MessageService();
