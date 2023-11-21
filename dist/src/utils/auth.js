"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getUserIDString = exports.receiveRefreshToken = exports.authentication = exports.creatTokenPair = exports.HEADER = void 0;
const JWT = __importStar(require("jsonwebtoken"));
const asyncHandler_1 = require("./asyncHandler");
const error_response_1 = require("../core/error.response");
const user_utils_1 = require("../utils/user.utils");
exports.HEADER = {
    CLIENT_KEY: "x-client-id",
    AUTHORZIRATION: "authorziration",
};
const creatTokenPair = (payload, privateKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "2 days",
        });
        const refreshToken = yield JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "7 days",
        });
        return { accessToken, refreshToken };
    }
    catch (error) {
        console.log("Create Token Error", error);
    }
});
exports.creatTokenPair = creatTokenPair;
exports.authentication = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdString = (0, exports.getUserIDString)(req);
    if (!userIdString)
        throw new error_response_1.AuthFailureError("Invalid Request 1");
    const user = yield (0, user_utils_1.findById)({ userID: userIdString });
    if (!user)
        throw new error_response_1.NotFoundError("Not found user");
    const accessToken = req.headers[exports.HEADER.AUTHORZIRATION];
    if (!accessToken)
        throw new error_response_1.AuthFailureError("Invalid Request 2");
    const accessTokenString = accessToken.toString();
    try {
        const decodeUser = (yield JWT.verify(accessTokenString, user.publicKey));
        if (userIdString !== decodeUser.userID.toString()) {
            throw new error_response_1.AuthFailureError("Invalid userID");
        }
        req.user = user;
        return next();
    }
    catch (error) {
        throw error;
    }
}));
exports.receiveRefreshToken = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.headers[exports.HEADER.AUTHORZIRATION];
        if (!refreshToken)
            throw new error_response_1.AuthFailureError("Invalid Request");
        const refreshTokenString = refreshToken.toString();
        req.refreshToken = refreshTokenString;
        return next();
    }
    catch (error) {
        throw error;
    }
}));
const getUserIDString = (req) => {
    var _a;
    const userIdString = (_a = req.headers[exports.HEADER.CLIENT_KEY]) === null || _a === void 0 ? void 0 : _a.toString();
    if (!userIdString)
        throw new error_response_1.ErrorResponse("userID not found", 400);
    return userIdString;
};
exports.getUserIDString = getUserIDString;
