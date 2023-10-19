import { ErrorResponse } from "../core/error.response"
import { AppDataSource } from "../data-source"
import { User } from "../entity/user.entity"
import { getInfoData } from "../utils/getInfoData"

class UserService {
  getUserByUserName = async (username: string, userId: any) => {
    const user = await AppDataSource.getRepository(User).findOneBy({
      userName: username,
    })
    if (user?.userID != userId) {
      throw new ErrorResponse("Invalid user", 400)
    }
    return {
      data: getInfoData({
        fields: ["userID", "email", "userName", "updated_at"],
        dataObject: user,
      }),
    }
  }

  updateUserByID = async (userupdate: any, userID: any) => {
    const user = await AppDataSource.createQueryBuilder(User, "user")
      .update()
      .set({ userName: userupdate.userName, email: userupdate.email })
      .where("userID = :userId", { userId: userID })
      .execute()

    const currentuser = await AppDataSource.getRepository(User).findOneBy({
      userID: userID,
    })
    return { currentuser }
  }

  deleteUserByID = async (userID: any) => {
    await AppDataSource.createQueryBuilder(User, "user")
      .delete()
      .where("userID = :userId", { userId: userID })
      .execute()

    return {}
  }
}
export default new UserService()
