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
exports.CheckProjectExists = exports.checkUserInProject = void 0;
const error_response_1 = require("../core/error.response");
const data_source_1 = require("../data-source");
const project_entity_1 = require("../entity/project.entity");
const checkUserInProject = (projectID, userID) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield data_source_1.AppDataSource.getRepository(project_entity_1.Project)
        .createQueryBuilder("project")
        .leftJoinAndSelect("project.users", "user")
        .where("project.projectID = :projectID", { projectID: projectID })
        .andWhere("user.userID = :userID", { userID: userID })
        .getOne();
    const isUserInProject = Boolean(currentUser);
    return isUserInProject;
});
exports.checkUserInProject = checkUserInProject;
const CheckProjectExists = (projectID) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield data_source_1.AppDataSource.getRepository(project_entity_1.Project)
        .createQueryBuilder("project")
        .where("project.projectID = :projectID", {
        projectID: projectID,
    })
        .getOne();
    if (!project) {
        throw new error_response_1.BadRequestError("Project not found!");
    }
    return project;
});
exports.CheckProjectExists = CheckProjectExists;
