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
exports.spellingcorrection = void 0;
const axios = require("axios");
const spellingcorrection = (textToCheck) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiUrl = "http://localhost:8000/spelling";
        const res = yield axios.get(apiUrl, {
            params: {
                text: textToCheck,
            },
        });
        const textCorrected = res.data || "";
        return textCorrected;
    }
    catch (error) {
        console.error("Error in spelling correction:", error);
        throw error;
    }
});
exports.spellingcorrection = spellingcorrection;
