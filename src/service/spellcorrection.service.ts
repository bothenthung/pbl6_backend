import { ErrorResponse } from "../core/error.response"
import { spellingcorrection } from "../utils/spellingcorrection"

class SpellCorrectionService {
  textCorrection = async (textToCheck: string) => {
    const textCorrected = await spellingcorrection(textToCheck)
    if (!textCorrected) throw new ErrorResponse("Please add content", 400)
    return textCorrected
  }
}
export default new SpellCorrectionService()
