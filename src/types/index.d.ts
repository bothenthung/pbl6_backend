import * as express from "express"
import { UserEntity } from "../entities/User.entity";

declare global {
    namespace Express {
        interface Request {
            user: UserEntity
        }
    }
}
