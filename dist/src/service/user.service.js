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
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entity/user.entity");
const getInfoData_1 = require("../utils/getInfoData");
class UserService {
    constructor() {
        this.getUserByUserName = (username, userId) => __awaiter(this, void 0, void 0, function* () {
            const user = yield data_source_1.AppDataSource.getRepository(user_entity_1.User).findOneBy({
                userName: username,
            });
            if ((user === null || user === void 0 ? void 0 : user.userID) != userId) {
                throw new error_response_1.ErrorResponse("Invalid user", 400);
            }
            return {
                data: (0, getInfoData_1.getInfoData)({
                    fields: ["userID", "email", "userName", "updated_at"],
                    dataObject: user,
                }),
            };
        });
        this.updateUserByID = (userupdate, userID) => __awaiter(this, void 0, void 0, function* () {
            const user = yield data_source_1.AppDataSource.createQueryBuilder(user_entity_1.User, "user")
                .update()
                .set({ userName: userupdate.userName, email: userupdate.email })
                .where("userID = :userId", { userId: userID })
                .execute();
            const currentuser = yield data_source_1.AppDataSource.getRepository(user_entity_1.User).findOneBy({
                userID: userID,
            });
            return { currentuser };
        });
        this.deleteUserByID = (userID) => __awaiter(this, void 0, void 0, function* () {
            yield data_source_1.AppDataSource.createQueryBuilder(user_entity_1.User, "user")
                .delete()
                .where("userID = :userId", { userId: userID })
                .execute();
            return {};
        });
    }
}
exports.default = new UserService();
