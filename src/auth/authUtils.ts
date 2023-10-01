import * as JWT from "jsonwebtoken"

// interface tokenPayload {
//     userID: number
//     password: String
// }

export const creatTokenPair = async (payload: any, privateKey: any) => {
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
