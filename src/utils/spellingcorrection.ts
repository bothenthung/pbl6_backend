import { Response } from "express"

const axios = require("axios")

export const spellingcorrection = async (textToCheck: string) => {
  try {
    const apiUrl = "https://185c-117-2-255-218.ngrok-free.app/spelling"
    const res = await axios.get(apiUrl, {
      params: {
        text: textToCheck,
      },
    })
    const textCorrected = res.data || ""
    return textCorrected
  } catch (error) {
    console.error("Error in spelling correction:", error)
    throw error
  }
}
