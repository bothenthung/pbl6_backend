import { creatTokenPair } from "../utils/auth"
import { AppDataSource } from "../data-source"
import { User } from "../entity/user.entity"
import bcrypt from "bcrypt"
import crypto from "crypto"
import { Auth } from "../types/authType"
import { getInfoData } from "../utils/getInfoData"
import { BadRequestError } from "../core/error.response"

class AuthService {
  signup = async ({ userName, email, password }: Auth) => {
    // try {
    const currentUser = AppDataSource.getRepository(User)
    const oldUser = await currentUser.findOneBy({
      email: email,
    })

    if (oldUser) {
      // return { code: "422", message: "Email already exists" }
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
    const privateKeyString = privateKey.toString()

    const tokens = await creatTokenPair(
      { email: email, username: userName },
      privateKey,
      publicKey
    )

    const newUser = await currentUser.save({
      email: email,
      password: passwordHash,
      userName: userName,
      refreshToken: tokens?.refreshToken,
      publicKey: publicKeyString,
    })

    return {
      code: 201,
      message: "tao user thanh cong hehe",
      metadata: {
        shop: getInfoData({
          fields: ["email", "userName"],
          dataObject: newUser,
        }),
        tokens,
      },
    }
    // } catch (error) {
    //   return { error, message: " Loi tao User" }
    // }
  }
}
export default new AuthService()
