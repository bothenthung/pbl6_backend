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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entity/user.entity");
const getInfoData_1 = require("../utils/getInfoData");
class PublicService {
}
_a = PublicService;
PublicService.checkEmailUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.AppDataSource.getRepository(user_entity_1.User).findOneBy({
        email: email,
    });
    if (!user) {
        return null;
    }
    return {
        users: (0, getInfoData_1.getInfoData)({
            fields: ["userID", "email", "userName"],
            dataObject: user,
        }),
    };
});
exports.default = PublicService;
