import { creatTokenPair } from "../utils/auth"
import { AppDataSource } from "../data-source"
import { User } from "../entity/user.entity"
import bcrypt from "bcrypt"
import crypto from "crypto"
import { Auth } from "../types/authType"
import { getInfoData } from "../utils/getInfoData"
import { AuthFailureError, BadRequestError } from "../core/error.response"
import { findByEmail } from "./user.service"

class AuthService {
  // static logout = async ({}) => {
  // }

  static login = async ({ email, password, refreshToken = "" }: Auth) => {
    const foundedUser = await findByEmail({ email })
    if (!foundedUser) throw new BadRequestError("Shop not registered")

    const matchPassword = await bcrypt.compare(password, foundedUser.password)
    if (!matchPassword) throw new AuthFailureError("Authentication error")

    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
    })

    const tokens = await creatTokenPair(
      {
        userID: foundedUser.email,
        email: foundedUser.email,
        userName: foundedUser.userName,
      },
      privateKey,
      publicKey
    )

    await AppDataSource.createQueryBuilder()
      .update(User)
      .set({ refreshToken: tokens?.refreshToken })
      .where("UserID = :id", { id: foundedUser.userID })
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
      throw new BadRequestError("Error: Shop already registered!")
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
    })

    const publicKeyString = publicKey.toString()

    const newUser = await currentUser.save({
      email: email,
      password: passwordHash,
      userName: userName,
      publicKey: publicKeyString,
    })

    const tokens = await creatTokenPair(
      { UserID: newUser.userID, email: email, username: userName },
      privateKey,
      publicKey
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
