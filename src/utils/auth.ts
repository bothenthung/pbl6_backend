import * as JWT from "jsonwebtoken"
import { asyncHandler } from "./asyncHandler"
import { NextFunction, Request, Response } from "express"
import { AuthFailureError, NotFoundError } from "../core/error.response"
import { findById } from "../service/user.service"

interface IPayload<T extends any = object> {}
interface JwtPayload {
  UserID: string
}

declare module "express" {
  interface Request {
    user: any
    publicKey: string
    accessTokenString: string
  }
}

const HEADER = {
  CLIENT_KEY: "x-client-id",
  AUTHORZIRATION: "authorziration",
}

export const creatTokenPair = async (
  payload: IPayload,
  privateKey: string,
  publicKey: string
) => {
  try {
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    })

    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    })

    return { accessToken, refreshToken }
  } catch (error) {
    console.log("Loi create Token", error)
  }
}

export const authentication = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userIdString = req.headers[HEADER.CLIENT_KEY]?.toString()
    if (!userIdString) throw new AuthFailureError("Invalid Request")

    const userID = parseInt(userIdString, 10)
    const user = await findById({ userID })
    if (!user) throw new NotFoundError("Not found user")

    const accessToken = req.headers[HEADER.AUTHORZIRATION]
    if (!accessToken) throw new AuthFailureError("Invalid Request")
    const accessTokenString = accessToken.toString()

    try {
      const decodeUser = (await JWT.verify(
        accessTokenString,
        user.publicKey
      )) as JwtPayload
      if (userIdString !== decodeUser.UserID.toString()) {
        throw new AuthFailureError("Invalid userID")
      }
      req.user = user

      return next()
    } catch (error) {
      throw error
    }
  }
)
