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
const column_entity_1 = require("../entity/column.entity");
const project_utils_1 = require("../utils/project.utils");
const task_entity_1 = require("../entity/task.entity");
class ProjectService {
}
_a = ProjectService;
ProjectService.addProject = (user, project) => __awaiter(void 0, void 0, void 0, function* () {
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const newProject = projectRepository.create({
        title: project.title,
        users: [user],
    });
    const saveProject = yield projectRepository.save(newProject);
    const projectCreated = {
        projectID: saveProject.projectID,
        title: saveProject.title,
        created_at: saveProject.created_at,
    };
    if (!projectCreated) {
        throw new error_response_1.BadRequestError("Project not created!");
    }
    return projectCreated;
});
ProjectService.deletePoject = (projectID, userID) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, project_utils_1.checkUserInProject)(projectID, userID);
    if (!user) {
        throw new error_response_1.BadRequestError("User does not belong to project!");
    }
    yield data_source_1.AppDataSource.getRepository(project_entity_1.Project)
        .createQueryBuilder("project")
        .where("projectID = :projectID", { projectID: projectID })
        .delete()
        .execute();
    return {};
});
ProjectService.getAllProjectByUserID = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const projects = yield projectRepository
        .createQueryBuilder("project")
        .select(["project.projectID", "project.title", "project.created_at"])
        .leftJoin("project.users", "user")
        .where("user.userID = :userID", { userID: user.userID })
        .getMany();
    if (!projects) {
        throw new error_response_1.BadRequestError("Project not found!");
    }
    return projects;
});
ProjectService.addUserToProject = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectID, email } = req.body;
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const project = yield projectRepository.findOneBy({
        projectID: projectID,
    });
    if (!project) {
        throw new error_response_1.BadRequestError("Project not found!");
    }
    const users = yield userRepository.findOneBy({ email: email });
    if (!users) {
        throw new error_response_1.BadRequestError("User is not registered!");
    }
    project.users.push(users);
    yield projectRepository.save(project);
    const updatedProject = yield projectRepository
        .createQueryBuilder("project")
        .leftJoinAndSelect("project.users", "user")
        .select([
        "project.projectID",
        "project.title",
        "user.userID",
        "user.userName",
        "user.email",
    ])
        .where("project.projectID = :projectID", { projectID })
        .getOne();
    if (!updatedProject) {
        throw new error_response_1.BadRequestError("Error getting user list after adding!");
    }
    return updatedProject;
});
ProjectService.addColumnToProject = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const columnRepository = data_source_1.AppDataSource.getRepository(column_entity_1.Columns);
    const existingColumn = yield columnRepository
        .createQueryBuilder("columns")
        .where("columns.project= :projectID", { projectID: reqBody.projectID })
        .andWhere("columns.index = :index", { index: reqBody.index })
        .getOne();
    if (existingColumn) {
        throw new error_response_1.BadRequestError("A column with the same index already exists or Project not found!");
    }
    const project = yield (0, project_utils_1.CheckProjectExists)(reqBody.projectID);
    if (!project) {
        throw new error_response_1.BadRequestError("Project not found!");
    }
    const column = yield columnRepository.save({
        title: reqBody.title,
        index: reqBody.index,
        project: project,
    });
    if (!column) {
        throw new error_response_1.BadRequestError("Add column failed!");
    }
    const columnadded = yield columnRepository
        .createQueryBuilder("columns")
        .select(["columns.columnID", "columns.title", "columns.index"])
        .where("columns.columnID = :columnID", { columnID: column.columnID })
        .getOne();
    if (!columnadded) {
        throw new error_response_1.BadRequestError("Add column failed!");
    }
    return columnadded;
});
ProjectService.getAllColumn = (projectID) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield data_source_1.AppDataSource.getRepository(project_entity_1.Project)
        .createQueryBuilder("project")
        .leftJoinAndSelect("project.columns", "column")
        .where("project.projectID = :projectID", {
        projectID: projectID,
    })
        .orderBy("column.index", "ASC")
        .getOne();
    if (!project) {
        throw new error_response_1.BadRequestError("Columns not found!");
    }
    return project;
});
ProjectService.deleteColumn = (req, columnID) => __awaiter(void 0, void 0, void 0, function* () {
    const projectID = req.body.projectID;
    console.log(columnID);
    const user = yield (0, project_utils_1.checkUserInProject)(req.body.projectID, req.user.userID);
    if (!user) {
        throw new error_response_1.BadRequestError("User does not belong to project!");
    }
    const columnRepository = data_source_1.AppDataSource.getRepository(column_entity_1.Columns);
    const existingColumn = yield columnRepository
        .createQueryBuilder("columns")
        .where("columns.project = :projectID", { projectID: req.body.projectID })
        .andWhere("columns.columnID = :columnID", { columnID: columnID })
        .getOne();
    if (!existingColumn) {
        throw new error_response_1.BadRequestError("ColumnID not found or Column does not belong to the project ");
    }
    yield columnRepository
        .createQueryBuilder()
        .update(column_entity_1.Columns)
        .set({ index: () => "`index` - 1" })
        .where("`index` > :columnIndex", { columnIndex: existingColumn.index })
        .andWhere("projectID = :projectID", { projectID: projectID })
        .execute();
    yield data_source_1.AppDataSource.getRepository(task_entity_1.Task)
        .createQueryBuilder()
        .delete()
        .from(task_entity_1.Task)
        .where("columnID = :columnID", { columnID: columnID })
        .execute();
    yield columnRepository
        .createQueryBuilder()
        .delete()
        .from(column_entity_1.Columns)
        .where("columnID = :columnID", { columnID: columnID })
        .execute();
    return {};
});
ProjectService.changeIndexColumn = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const columnRepository = yield data_source_1.AppDataSource.getRepository(column_entity_1.Columns);
    const { projectID, columnID, newIndex, oldIndex } = req.body;
    const currentUser = yield (0, project_utils_1.checkUserInProject)(projectID, req.user.userID);
    if (!currentUser) {
        throw new error_response_1.BadRequestError("User is not in the project!");
    }
    const column = yield data_source_1.AppDataSource.getRepository(column_entity_1.Columns).findOneBy({
        columnID: columnID,
    });
    if ((column === null || column === void 0 ? void 0 : column.index) != oldIndex) {
        throw new error_response_1.BadRequestError("The index of the column is incorrect!");
    }
    if (!column) {
        throw new error_response_1.BadRequestError("Column not found!");
    }
    if (oldIndex < newIndex) {
        yield columnRepository
            .createQueryBuilder()
            .update(column_entity_1.Columns)
            .set({ index: () => "`index` - 1" })
            .where("projectID = :projectID AND index >= :oldIndex AND index <= :newIndex", { projectID, oldIndex, newIndex })
            .execute();
        yield columnRepository
            .createQueryBuilder()
            .update(column_entity_1.Columns)
            .set({ index: newIndex })
            .where("columnID = :columnID AND index = :oldIndex - 1", {
            columnID,
            oldIndex,
        })
            .execute();
    }
    else if (oldIndex > newIndex) {
        yield columnRepository
            .createQueryBuilder()
            .update(column_entity_1.Columns)
            .set({ index: () => "`index` + 1" })
            .where("projectID = :projectID AND index >= :newIndex AND index <= :oldIndex", { projectID, newIndex, oldIndex })
            .execute();
        yield columnRepository
            .createQueryBuilder()
            .update(column_entity_1.Columns)
            .set({ index: newIndex })
            .where("columnID = :columnID AND index = :oldIndex + 1", {
            columnID,
            oldIndex,
        })
            .execute();
    }
    const project = yield _a.getAllColumn(projectID);
    return project;
});
ProjectService.addTask = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, deadline_date, index, columnID } = req.body;
    const deadline_Date = new Date(deadline_date);
    const taskRepository = data_source_1.AppDataSource.getRepository(task_entity_1.Task);
    const existingTask = yield taskRepository
        .createQueryBuilder("task")
        .where("task.column=:columnID", { columnID: columnID })
        .andWhere("task.index = :index", { index: index })
        .getOne();
    if (existingTask) {
        throw new error_response_1.BadRequestError("Index already exists in the column");
    }
    const column = yield data_source_1.AppDataSource.getRepository(column_entity_1.Columns).findOneBy({
        columnID: columnID,
    });
    if (!column) {
        throw new error_response_1.BadRequestError("Column not found!");
    }
    const newTask = taskRepository.create({
        title: title,
        description: description,
        index: index,
        deadline_date: deadline_Date,
        column: column,
        user: req.user,
    });
    const saveTask = yield taskRepository.save(newTask);
    const savedTask = {
        title: saveTask.title,
        description: saveTask.description,
        index: saveTask.index,
        deadline_date: saveTask.deadline_date,
        column: saveTask.column,
    };
    return savedTask;
});
ProjectService.changeIndexTask = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskID, sourceColumnID, targetColumnID, newIndex, oldIndex } = req.body;
    const taskRepository = data_source_1.AppDataSource.getRepository(task_entity_1.Task);
    const task = yield taskRepository
        .createQueryBuilder("task")
        .where("task.column=:columnID", { columnID: sourceColumnID })
        .andWhere("task.taskID = :taskID", { taskID: taskID })
        .andWhere("task.index = :oldIndex", { oldIndex: oldIndex })
        .getOne();
    if (!task) {
        throw new error_response_1.BadRequestError("Task not found!");
    }
    if (targetColumnID == sourceColumnID) {
        if (oldIndex > newIndex) {
            yield taskRepository
                .createQueryBuilder()
                .update(task_entity_1.Task)
                .set({ index: () => "`index` + 1" })
                .where("`index` >= :newIndex", { newIndex })
                .andWhere("`index` < :oldIndex", { oldIndex })
                .andWhere("columnID = :sourceColumnID", { sourceColumnID })
                .execute();
        }
        else if (oldIndex < newIndex) {
            yield taskRepository
                .createQueryBuilder()
                .update(task_entity_1.Task)
                .set({ index: () => "`index` - 1" })
                .where("`index` <= :newIndex", { newIndex })
                .andWhere("`index` > :oldIndex", { oldIndex })
                .andWhere("columnID = :sourceColumnID", { sourceColumnID })
                .execute();
        }
        yield taskRepository
            .createQueryBuilder()
            .update(task_entity_1.Task)
            .set({ index: newIndex })
            .where("taskID = :taskID AND index = :oldIndex", {
            taskID: task.taskID,
            oldIndex,
        })
            .execute();
    }
    else {
        yield taskRepository
            .createQueryBuilder()
            .update(task_entity_1.Task)
            .set({ index: () => "`index` - 1" })
            .where("`index` > :oldIndex", { oldIndex: oldIndex })
            .andWhere("columnID = :sourceColumnID", { sourceColumnID })
            .execute();
        yield taskRepository
            .createQueryBuilder()
            .update(task_entity_1.Task)
            .set({ index: () => "`index` + 1" })
            .where("`index` >= :newIndex", { newIndex })
            .andWhere("columnID = :targetColumnID", { targetColumnID })
            .execute();
        yield taskRepository
            .createQueryBuilder()
            .update(task_entity_1.Task)
            .set({ index: newIndex, column: targetColumnID })
            .where("taskID = :taskID", {
            taskID: task.taskID,
        })
            .execute();
    }
    return {};
});
ProjectService.getAllTask = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { columnID } = req.body;
    const userID = req.user.userID;
    // const user = await checkUserInProject(projectID, userID)
    // if (!user) {
    //   throw new BadRequestError("User does not belong to project!")
    // }
    const column = yield data_source_1.AppDataSource.getRepository(column_entity_1.Columns)
        .createQueryBuilder("columns")
        .leftJoinAndSelect("columns.tasks", "task")
        .where("columns.columnID = :columnID", {
        columnID: columnID,
    })
        .orderBy("task.index", "ASC")
        .getOne();
    if (!column) {
        throw new error_response_1.BadRequestError("Column not found!");
    }
    return column;
});
exports.default = ProjectService;
