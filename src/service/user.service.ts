import { ErrorResponse } from "../core/error.response"
import { AppDataSource } from "../data-source"
import { User } from "../entity/user.entity"
import { UserProject } from "../entity/userProject.entity"
import { getInfoData } from "../utils/getInfoData"
import { IQueryOptions, pagination } from "../utils/pagination"

class UserService {
  getUserByUserName = async (username: string, userId: string) => {
    const user = await AppDataSource.getRepository(User).findOneBy({
      userName: username,
    })
    if (user?.userID != userId) {
      throw new ErrorResponse("Invalid user", 400)
    }
    return {
      data: getInfoData({
        fields: ["userID", "email", "userName"],
        dataObject: user,
      }),
    }
  }

  updateUserByID = async (userupdate: any, userID: string) => {
    const user = await AppDataSource.createQueryBuilder(User, "user")
      .update()
      .set({ userName: userupdate.userName, email: userupdate.email })
      .where("userID = :userId", { userId: userID })
      .execute()

    const currentuser = await AppDataSource.getRepository(User).findOneBy({
      userID: userID,
    })
    return {
      data: getInfoData({
        fields: ["userID", "email", "userName"],
        dataObject: currentuser,
      }),
    }
  }

  // deleteUserByID = async (userID: string) => {
  //   await AppDataSource.createQueryBuilder(User, "user")
  //     .delete()
  //     .where("userID = :userId", { userId: userID })
  //     .execute()

  //   return {}
  // }

  getListUserByProjectID = async (req: any, paginationInfo: IQueryOptions) => {
    const userRepository = AppDataSource.getRepository(User);

    const entity = await userRepository
    .createQueryBuilder("user")
    .innerJoin(UserProject, "userProject", "userProject.userID = user.userID")
    .where("userProject.projectID = :projectID", { projectID: req.query.projectID as string })
    .andWhere("user.userID <> :excludeUserID", { excludeUserID: req.user.userID as string })
    
    const users = pagination(entity, paginationInfo);
    return users;
  }
}
export default new UserService()
