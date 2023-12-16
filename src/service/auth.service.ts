import bcrypt from "bcrypt"
import {
  AuthFailureError,
  BadRequestError,
  ForbiddenError,
} from "../core/error.response"
import { AppDataSource } from "../data-source"
import { User } from "../entity/user.entity"
import { Auth } from "../types/authType"
import { creatTokenPair } from "../utils/auth"
import { CreateKey } from "../utils/createKey"
import { getInfoData } from "../utils/getInfoData"
import {
  findByEmail,
  findByRefreshToken,
  removeKeyById,
} from "../utils/user.utils"

class AuthService {
  static handlerRefreshToken = async (refreshToken: string) => {
    const user = await findByRefreshToken(refreshToken)
    if (!user)
      throw new ForbiddenError("Somethinh wrong happend !! Please relogin")
    const key = await CreateKey()
    const tokens = await creatTokenPair(
      {
        userID: user.userID,
        email: user.email,
        userName: user.userName,
      },
      key.privateKey
    )

    await AppDataSource.createQueryBuilder()
      .update(User)
      .set({ refreshToken: tokens?.refreshToken, publicKey: key.publicKey })
      .where("userID = :id", { id: user.userID })
      .execute()

    return {
      user: getInfoData({
        fields: ["userID", "email", "userName"],
        dataObject: user,
      }),
      tokens,
    }
  }

  static logout = async (user: any) => {
    const delKeyUser = await removeKeyById(user.userID)
    return delKeyUser
  }

  static login = async ({ email, password }: Auth) => {
    const foundedUser = await findByEmail({ email })
    if (!foundedUser) throw new BadRequestError("User not registered")

    const matchPassword = await bcrypt.compare(password, foundedUser.password)
    if (!matchPassword) throw new AuthFailureError("Authentication error")

    const key = await CreateKey()
    const tokens = await creatTokenPair(
      {
        userID: foundedUser.userID,
        email: foundedUser.email,
        userName: foundedUser.userName,
      },
      key.privateKey
    )
    const publicKeyString = key.publicKey.toString()

    await AppDataSource.createQueryBuilder()
      .update(User)
      .set({ refreshToken: tokens?.refreshToken, publicKey: publicKeyString })
      .where("userID = :id", { id: foundedUser.userID })
      .execute()

    return {
      user: getInfoData({
        fields: ["userID", "email", "userName"],
        dataObject: foundedUser,
      }),
      tokens,
    }
  }

  static signup = async ({ userName, email, password }: Auth) => {
    const currentUser = AppDataSource.getRepository(User)
    const oldUser = await currentUser.findOneBy({
      email: email,
    })

    if (oldUser) {
      throw new BadRequestError("Error: User already registered!")
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const key = await CreateKey()
    const publicKeyString = key.publicKey.toString()

    const newUser = await currentUser.save({
      email: email,
      password: passwordHash,
      userName: userName,
      publicKey: publicKeyString,
    })

    const tokens = await creatTokenPair(
      { userID: newUser.userID, email: email, username: userName },
      key.privateKey
    )
    if (tokens) {
      newUser.refreshToken = tokens.refreshToken
      await currentUser.save(newUser)
    } else {
      console.error("Failed to generate tokens.")
    }

    return {
      user: getInfoData({
        fields: ["userID", "email", "userName"],
        dataObject: newUser,
      }),
      tokens,
    }
  }
}
export default AuthService
