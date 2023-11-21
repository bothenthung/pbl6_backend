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
const project_entity_1 = require("../entity/project.entity");
const error_response_1 = require("../core/error.response");
const typeorm_1 = require("typeorm");
class ProjectService {
}
_a = ProjectService;
ProjectService.createProject = (user, project) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const currentUser = yield userRepository.findOneBy({ userID: user.userID });
    if (!currentUser) {
        throw new error_response_1.BadRequestError("User not found!");
    }
    const newProject = projectRepository.create({
        title: project.title,
        users: [currentUser],
    });
    const saveProject = yield projectRepository.save(newProject);
    const projectCreated = yield projectRepository.findOneBy({
        projectID: saveProject.projectID,
    });
    if (!projectCreated) {
        throw new error_response_1.BadRequestError("Project not created!");
    }
    return projectCreated;
});
ProjectService.getAllProjectByUserID = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const project = yield projectRepository.find({
        //   relations: ["users"],
        where: { users: { userID: user.userID } },
    });
    if (!project) {
        throw new error_response_1.BadRequestError("Project not found");
    }
    return project;
});
ProjectService.addUserToProject = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectID, userIDs } = req.body;
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const project = yield projectRepository.findOneBy({
        projectID: projectID,
    });
    if (!project) {
        throw new error_response_1.BadRequestError("Project not found!");
    }
    const users = yield userRepository.find({
        where: { userID: (0, typeorm_1.In)(userIDs) },
    });
    if (!users) {
        throw new error_response_1.BadRequestError("Add users failed ");
    }
    console.log(project.users);
    // project.users = [...project.users, ...users]
    project.users.push(...users);
    yield projectRepository.save(project);
    const updatedProject = yield projectRepository
        .createQueryBuilder("project")
        .leftJoinAndSelect("project.users", "user")
        .select([
        "project.projectID",
        "project.title",
        "user.userID",
        "user.username",
    ])
        .where("project.projectID = :projectID", { projectID })
        .getOne();
    if (!updatedProject) {
        throw new error_response_1.BadRequestError("Error getting user list after adding!");
    }
    return updatedProject;
});
exports.default = ProjectService;
