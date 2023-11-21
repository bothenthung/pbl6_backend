import { SuccessResponse } from "../core/success.reponse"
import { AppDataSource } from "../data-source"
import { User } from "../entity/user.entity"
import { getInfoData } from "../utils/getInfoData"

class PublicService {
  static checkEmailUser = async (email: string) => {
    const user = await AppDataSource.getRepository(User).findOneBy({
      email: email,
    })
    if (!user) {
      return []
    }
    return {
      users: getInfoData({
        fields: ["userID", "email", "userName"],
        dataObject: user,
      }),
    }
  }
}
export default PublicService
