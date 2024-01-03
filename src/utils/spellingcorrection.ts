import { Response } from "express"

const axios = require("axios")

export const spellingcorrection = async (textToCheck: string) => {
  try {
    const apiUrl = "http://20.212.111.85:8000/spelling"
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
