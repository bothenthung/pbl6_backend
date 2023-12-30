import { Request } from "express"
import { FindOneOptions } from "typeorm"
import { AppDataSource } from "../data-source"
import { InvitationEntity } from "../entity/invitation.entity"
import { Project } from "../entity/project.entity"
import { User } from "../entity/user.entity"


class Invitation {
  inviteUserToProject = async (req: Request) => {
    const {userReceiveIds , userSendId , projectID , message} = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const projectRepository = AppDataSource.getRepository(Project);
    const invitationRepository = AppDataSource.getRepository(InvitationEntity);

    const sender = await userRepository.findOne({where: {userID: userSendId}});
    const project = await projectRepository.findOne({where: {projectID}});

    if (!sender || !project) throw new Error('Sender or project not found');

    const invitations = userReceiveIds.map(async (receiverId: FindOneOptions<User>) => {
      const params = { message, projectID, userSendId, userReceiveId: receiverId}
      return invitationRepository.create(params as any);
    });

    await Promise.all(invitations.map(async (invitation: any) => invitationRepository.save(await invitation)));
    return {};
  }

  
}
export default new Invitation()
