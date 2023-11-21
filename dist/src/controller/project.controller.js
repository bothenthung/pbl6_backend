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
const success_reponse_1 = require("../core/success.reponse");
const project_service_1 = __importDefault(require("../service/project.service"));
class ProjectController {
    constructor() {
        this.createProject = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_reponse_1.SuccessResponse({
                message: "Create project success.",
                metadata: yield project_service_1.default.createProject(req.user, req.body),
            }).send(res, {});
        });
        this.getAllProjectByUserID = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_reponse_1.SuccessResponse({
                message: "Get all project success.",
                metadata: yield project_service_1.default.getAllProjectByUserID(req.user),
            }).send(res, {});
        });
        this.addUserToProject = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_reponse_1.SuccessResponse({
                message: "Add users success.",
                metadata: yield project_service_1.default.addUserToProject(req),
            }).send(res, {});
        });
    }
}
exports.default = new ProjectController();
