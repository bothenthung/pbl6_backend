import * as JWT from "jsonwebtoken"

interface IPayload<T extends any = object> {}

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
