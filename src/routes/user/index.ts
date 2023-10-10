import { Request, Response, Router } from "express"
import { AppDataSource } from "../../data-source"
import { User } from "../../entity/user.entity"

export const userRouter = Router()
