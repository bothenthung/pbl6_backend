import { AppDataSource } from "../data-source"
import { User } from "../entity/user.entity"

export const findByEmail = async ({ email }: { email: string }) => {
  return await AppDataSource.getRepository(User).findOneBy({ email })
}

export const findById = async ({ userID }: { userID: string }) => {
  return await AppDataSource.getRepository(User).findOneBy({ userID })
}

export const findByRefreshToken = async (refreshToken: string) => {
  return await AppDataSource.getRepository(User).findOneBy({ refreshToken })
}

export const removeKeyById = async (userID: string) => {
  return await AppDataSource.createQueryBuilder()
    .update(User)
    .set({ refreshToken: null, publicKey: null })
    .where("userID = :id", { id: userID })
    .execute()
}
