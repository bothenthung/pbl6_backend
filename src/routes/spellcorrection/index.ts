import express from "express"
import { asyncHandler } from "../../utils/asyncHandler"
import SpellCorrectionController from "../../controller/spellcorrection.controller"
import multer from "multer"

const upload = multer()

export const spellCorrectionRouter = express.Router()
spellCorrectionRouter.post(
  "/",
  upload.single("file"),
  asyncHandler(SpellCorrectionController.spellcorrection) as any
)
