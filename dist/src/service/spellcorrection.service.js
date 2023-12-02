"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_response_1 = require("../core/error.response");
const spellingcorrection_1 = require("../utils/spellingcorrection");
class SpellCorrectionService {
    constructor() {
        this.textCorrection = (textToCheck) => __awaiter(this, void 0, void 0, function* () {
            const textCorrected = yield (0, spellingcorrection_1.spellingcorrection)(textToCheck);
            if (!textCorrected)
                throw new error_response_1.ErrorResponse("Please add content", 400);
            return textCorrected;
        });
    }
}
exports.default = new SpellCorrectionService();
