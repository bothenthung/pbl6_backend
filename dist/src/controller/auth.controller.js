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
const auth_service_1 = __importDefault(require("../service/auth.service"));
const success_reponse_1 = require("../core/success.reponse");
class AuthController {
    constructor() {
        this.signup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            //return res.status(201).json(await authService.signup(req.body))
            new success_reponse_1.CREATED({
                message: "Regiserted OK!",
                metadata: yield auth_service_1.default.signup(req.body),
            }).send(res, {});
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            //return res.status(201).json(await authService.signup(req.body))
            new success_reponse_1.OK({
                message: "Login success!",
                metadata: yield auth_service_1.default.login(req.body),
            }).send(res, {});
        });
    }
}
exports.default = new AuthController();
