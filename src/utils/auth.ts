import * as JWT from "jsonwebtoken"
import { asyncHandler } from "./asyncHandler"
import { NextFunction, Request, Response } from "express"
import {
  AuthFailureError,
  ErrorResponse,
  NotFoundError,
} from "../core/error.response"
import { findById } from "../utils/user.utils"

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
  AUTHORIZATION: "authorization",
}

export const creatTokenPair = async <T extends object = object>(payload: Partial<T>, privateKey: string) => {
  try {
    const accessToken = JWT.sign(payload, privateKey, {
      expiresIn: "2 days",
    })

    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    })

    return { accessToken, refreshToken }
  } catch (error) {
    console.log("Create Token Error", error)
  }
}

/** @deprecated */
export const authentication = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userIdString = getUserIDString(req)
    if (!userIdString) throw new AuthFailureError("Invalid Request userID")

    const user = await findById({ userID: userIdString })
    if (!user) throw new NotFoundError("Not found user")

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken)
      throw new AuthFailureError("Invalid Request authorization")
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
      const refreshToken = req.headers[HEADER.AUTHORIZATION]
      if (!refreshToken) throw new AuthFailureError("Invalid Request")
      const refreshTokenString = refreshToken.toString()
      req.refreshToken = refreshTokenString

      return next()
    } catch (error) {
      throw error
    }
  }
)

/** @deprecated */
export const getUserIDString = (req: Request) => {
  const userIdString = req.headers[HEADER.CLIENT_KEY]?.toString()
  if (!userIdString) throw new ErrorResponse("userID not found", 400)
  return userIdString
}
