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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../utils/auth");
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entity/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const getInfoData_1 = require("../utils/getInfoData");
const error_response_1 = require("../core/error.response");
const user_service_1 = require("./user.service");
class AuthService {
}
_a = AuthService;
// login = async ({ email, password, refreshToken = "" }: Auth) => {
//   const foundUser = await findByEmail(email)
// }
AuthService.login = ({ email, password, refreshToken = "" }) => __awaiter(void 0, void 0, void 0, function* () {
    const foundedUser = yield (0, user_service_1.findByEmail)({ email });
    if (!foundedUser)
        throw new error_response_1.BadRequestError("Shop not registered");
    const matchPassword = yield bcrypt_1.default.compare(password, foundedUser.password);
    if (!matchPassword)
        throw new error_response_1.AuthFailureError("Authentication error");
    const { privateKey, publicKey } = crypto_1.default.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
    });
    const tokens = yield (0, auth_1.creatTokenPair)({ email: foundedUser.email, userName: foundedUser.userName }, privateKey, publicKey);
    //findAndUpdateOrCreate
    return {
        user: (0, getInfoData_1.getInfoData)({
            fields: ["userID", "email", "userName"],
            dataObject: foundedUser,
        }),
        tokens,
    };
});
AuthService.signup = ({ userName, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    const currentUser = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const oldUser = yield currentUser.findOneBy({
        email: email,
    });
    if (oldUser) {
        // return { code: "422", message: "Email already exists" }
        throw new error_response_1.BadRequestError("Error: Shop already registered!");
    }
    const passwordHash = yield bcrypt_1.default.hash(password, 10);
    const { privateKey, publicKey } = crypto_1.default.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
    });
    const publicKeyString = publicKey.toString();
    const tokens = yield (0, auth_1.creatTokenPair)({ email: email, username: userName }, privateKey, publicKey);
    const newUser = yield currentUser.save({
        email: email,
        password: passwordHash,
        userName: userName,
        refreshToken: tokens === null || tokens === void 0 ? void 0 : tokens.refreshToken,
        publicKey: publicKeyString,
    });
    return {
        code: 201,
        message: "User created successfully",
        user: (0, getInfoData_1.getInfoData)({
            fields: ["email", "userName"],
            dataObject: newUser,
        }),
        tokens,
    };
    // } catch (error) {
    //   return { error, message: " Loi tao User" }
    // }
});
exports.default = AuthService;
