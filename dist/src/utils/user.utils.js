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
exports.sortId = exports.removeKeyById = exports.findByRefreshToken = exports.findById = exports.findByEmail = void 0;
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entity/user.entity");
const findByEmail = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.AppDataSource.getRepository(user_entity_1.User).findOneBy({ email });
});
exports.findByEmail = findByEmail;
const findById = ({ userID }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.AppDataSource.getRepository(user_entity_1.User).findOneBy({ userID });
});
exports.findById = findById;
const findByRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.AppDataSource.getRepository(user_entity_1.User).findOneBy({ refreshToken });
});
exports.findByRefreshToken = findByRefreshToken;
const removeKeyById = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.AppDataSource.createQueryBuilder()
        .update(user_entity_1.User)
        .set({ refreshToken: null, publicKey: null })
        .where("userID = :id", { id: userID })
        .execute();
});
exports.removeKeyById = removeKeyById;
const sortId = (id1, id2) => {
    const sortedStrings = [id1, id2].sort((a, b) => a.localeCompare(b));
    return sortedStrings;
};
exports.sortId = sortId;
