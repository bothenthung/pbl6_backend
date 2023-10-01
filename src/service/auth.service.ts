import { creatTokenPair } from "../auth/authUtils"
import { AppDataSource } from "../data-source"
import { User } from "../entity/user.entity"
import bcrypt from "bcrypt"
import crypto from "crypto"

interface Auth {
  name: string
  email: string
  password: string
  refreshToken: string
}

class AuthService {
  signup = async ({ name, email, password }: Auth) => {
    try {
      const currentUser = AppDataSource.getRepository(User)
      const holderUser = await currentUser.findOneBy({
        email: email,
      })
      if (holderUser) {
        return { code: "xxx", message: "Email already exists" }
      }

      const passwordHash = await bcrypt.hash(password, 10)

      const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
      })

      const publicKeyString = publicKey.toString()

      // created token pair
      // const tokens = await creatTokenPair(
      //   { userID: newUser.userID },
      //   privateKey
      // )
      const tokens = await creatTokenPair({ email: email }, privateKey)

      const newUser = await currentUser.save({
        email: email,
        password: passwordHash,
        userName: name,
        refreshToken: tokens?.refreshToken,
        publicKey: publicKeyString,
      })

      return {
        code: 201,
        message: "tao user thanh cong hehe",
        metadata: {
          user: newUser,
          tokens,
        },
      }
    } catch (error) {
      return { error, message: " Loi tao User" }
    }
  }
}
export default new AuthService()
