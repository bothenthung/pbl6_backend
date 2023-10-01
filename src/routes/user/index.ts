import { Request, Response, Router } from "express"
import { AppDataSource } from "../../data-source"
import { User } from "../../entity/user.entity"

export const userRouter = Router()

userRouter.get("/getAllUser", async (req: Request, res: Response) => {
  const users = await AppDataSource.getRepository(User).find()
  res.status(200).json({ users, text: "tin chuan" })
})
