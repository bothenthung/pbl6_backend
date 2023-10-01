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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entity/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    constructor() {
        this.signup = ({ name, email, password, refreshToken }) => __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = data_source_1.AppDataSource.getRepository(user_entity_1.User);
                const holderUser = yield currentUser.findOneBy({
                    email: email,
                });
                if (holderUser) {
                    return { code: "xxx", message: "Email already exists" };
                }
                const passwordHash = yield bcrypt_1.default.hash(password, 10);
                const newUser = yield currentUser.save({
                    email: email,
                    password: passwordHash,
                    userName: name,
                    refreshToken: refreshToken,
                });
                return newUser;
            }
            catch (error) { }
        });
    }
}
exports.default = new AuthService();
