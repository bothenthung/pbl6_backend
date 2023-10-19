import * as JWT from "jsonwebtoken"
import { asyncHandler } from "./asyncHandler"
import { NextFunction, Request, Response } from "express"
import { AuthFailureError, NotFoundError } from "../core/error.response"
import { findById } from "../utils/user.utils"

interface IPayload<T extends any = object> {}
interface JwtPayload {
  userID: string
}

declare module "express" {
  interface Request {
    refreshToken: string
    user: any
    publicKey: string
    accessTokenString: string
  }
}

export const HEADER = {
  CLIENT_KEY: "x-client-id",
  AUTHORZIRATION: "authorziration",
}

export const creatTokenPair = async (payload: IPayload, privateKey: string) => {
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
    console.log("Create Token Error", error)
  }
}

export const authentication = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userIdString = req.headers[HEADER.CLIENT_KEY] as string
    if (!userIdString) throw new AuthFailureError("Invalid Request 1")

    const user = await findById({ userID: userIdString })
    if (!user) throw new NotFoundError("Not found user")

    const accessToken = req.headers[HEADER.AUTHORZIRATION]
    if (!accessToken) throw new AuthFailureError("Invalid Request 2")
    const accessTokenString = accessToken.toString()

    try {
      const decodeUser = (await JWT.verify(
        accessTokenString,
        user.publicKey as string
      )) as JwtPayload

      if (userIdString !== decodeUser.userID.toString()) {
        throw new AuthFailureError("Invalid userID")
      }

      req.user = user
      return next()
    } catch (error) {
      throw error
    }
  }
)

export const receiveRefreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.headers[HEADER.AUTHORZIRATION]
      if (!refreshToken) throw new AuthFailureError("Invalid Request")
      const refreshTokenString = refreshToken.toString()
      req.refreshToken = refreshTokenString

      return next()
    } catch (error) {
      throw error
    }
  }
)
