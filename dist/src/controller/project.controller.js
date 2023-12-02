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
        this.addProject = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_reponse_1.SuccessResponse({
                message: "Create project success.",
                metadata: yield project_service_1.default.addProject(req.user, req.body),
            }).send(res, {});
        });
        this.getAllProjectByUserID = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_reponse_1.SuccessResponse({
                message: "Get all project success.",
                metadata: yield project_service_1.default.getAllProjectByUserID(req.user),
            }).send(res, {});
        });
        this.deleteProject = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const projectID = req.params.projectID;
            new success_reponse_1.SuccessResponse({
                message: "Delete project success.",
                metadata: yield project_service_1.default.deletePoject(projectID, req.user.userID),
            }).send(res, {});
        });
        this.getProjectDetails = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // const projectID = req.params.projectID
            new success_reponse_1.SuccessResponse({
                message: "Get all project success.",
                metadata: yield project_service_1.default.getProjectDetails(req.user.userID, req),
            }).send(res, {});
        });
        this.addUserToProject = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_reponse_1.SuccessResponse({
                message: "Add users success.",
                metadata: yield project_service_1.default.addUserToProject(req),
            }).send(res, {});
        });
        this.addColumnToProject = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_reponse_1.SuccessResponse({
                message: "Add column success.",
                metadata: yield project_service_1.default.addColumnToProject(req.body),
            }).send(res, {});
        });
        this.getAllColumn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_reponse_1.SuccessResponse({
                message: "Get all columns success.",
                metadata: yield project_service_1.default.getAllColumn(req.body.projectID),
            }).send(res, {});
        });
        this.deleteColumn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const columnID = req.params.columnID;
            new success_reponse_1.SuccessResponse({
                message: "Delete column success.",
                metadata: yield project_service_1.default.deleteColumn(req, columnID),
            }).send(res, {});
        });
        this.changeIndexColumn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_reponse_1.SuccessResponse({
                message: "Change index column success.",
                metadata: yield project_service_1.default.changeIndexColumn(req),
            }).send(res, {});
        });
        this.addTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_reponse_1.SuccessResponse({
                message: "Add task success.",
                metadata: yield project_service_1.default.addTask(req),
            }).send(res, {});
        });
        this.getAllTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_reponse_1.SuccessResponse({
                message: "Get all tasks success.",
                metadata: yield project_service_1.default.getAllTask(req),
            }).send(res, {});
        });
        this.changeIndexTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_reponse_1.SuccessResponse({
                message: "Change index task success.",
                metadata: yield project_service_1.default.changeIndexTask(req),
            }).send(res, {});
        });
    }
}
exports.default = new ProjectController();
