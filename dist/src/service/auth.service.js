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
const getInfoData_1 = require("../utils/getInfoData");
const error_response_1 = require("../core/error.response");
const user_service_1 = require("./user.service");
const createKey_1 = require("../utils/createKey");
class AuthService {
}
_a = AuthService;
AuthService.handlerRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.findByRefreshToken)(refreshToken);
    if (!user)
        throw new error_response_1.ForbiddenError("Somethinh wrong happend !! Please relogin");
    const key = yield (0, createKey_1.CreateKey)();
    const tokens = yield (0, auth_1.creatTokenPair)({
        userID: user.userID,
        email: user.email,
        userName: user.userName,
    }, key.privateKey);
    yield data_source_1.AppDataSource.createQueryBuilder()
        .update(user_entity_1.User)
        .set({ refreshToken: tokens === null || tokens === void 0 ? void 0 : tokens.refreshToken, publicKey: key.publicKey })
        .where("userID = :id", { id: user.userID })
        .execute();
    return {
        user: (0, getInfoData_1.getInfoData)({
            fields: ["userID", "email", "userName"],
            dataObject: user,
        }),
        tokens,
    };
});
AuthService.logout = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const delKeyUser = yield (0, user_service_1.removeKeyById)(user.userID);
    return delKeyUser;
});
AuthService.login = ({ email, password, refreshToken = "" }) => __awaiter(void 0, void 0, void 0, function* () {
    const foundedUser = yield (0, user_service_1.findByEmail)({ email });
    if (!foundedUser)
        throw new error_response_1.BadRequestError("Shop not registered");
    const matchPassword = yield bcrypt_1.default.compare(password, foundedUser.password);
    if (!matchPassword)
        throw new error_response_1.AuthFailureError("Authentication error");
    const key = yield (0, createKey_1.CreateKey)();
    const tokens = yield (0, auth_1.creatTokenPair)({
        userID: foundedUser.userID,
        email: foundedUser.email,
        userName: foundedUser.userName,
    }, key.privateKey);
    const publicKeyString = key.publicKey.toString();
    yield data_source_1.AppDataSource.createQueryBuilder()
        .update(user_entity_1.User)
        .set({ refreshToken: tokens === null || tokens === void 0 ? void 0 : tokens.refreshToken, publicKey: publicKeyString })
        .where("userID = :id", { id: foundedUser.userID })
        .execute();
    return {
        user: (0, getInfoData_1.getInfoData)({
            fields: ["userID", "email", "userName"],
            dataObject: foundedUser,
        }),
        tokens,
    };
});
AuthService.signup = ({ userName, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const oldUser = yield currentUser.findOneBy({
        email: email,
    });
    if (oldUser) {
        throw new error_response_1.BadRequestError("Error: Shop already registered!");
    }
    const passwordHash = yield bcrypt_1.default.hash(password, 10);
    const key = yield (0, createKey_1.CreateKey)();
    const publicKeyString = key.publicKey.toString();
    const newUser = yield currentUser.save({
        email: email,
        password: passwordHash,
        userName: userName,
        publicKey: publicKeyString,
    });
    const tokens = yield (0, auth_1.creatTokenPair)({ userID: newUser.userID, email: email, username: userName }, key.privateKey);
    if (tokens) {
        newUser.refreshToken = tokens.refreshToken;
        yield currentUser.save(newUser);
    }
    else {
        console.error("Failed to generate tokens.");
    }
    return {
        user: (0, getInfoData_1.getInfoData)({
            fields: ["userID", "email", "userName"],
            dataObject: newUser,
        }),
        tokens,
    };
});
exports.default = AuthService;
