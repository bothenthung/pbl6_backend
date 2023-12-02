"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const column_entity_1 = require("./entity/column.entity");
const message_entity_1 = require("./entity/message.entity");
const project_entity_1 = require("./entity/project.entity");
const task_entity_1 = require("./entity/task.entity");
const user_entity_1 = require("./entity/user.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "12345678",
    database: "pbl6",
    logging: true,
    entities: [user_entity_1.User, project_entity_1.Project, column_entity_1.Columns, task_entity_1.Task, message_entity_1.MessageEntity],
    migrationsRun: true,
    migrations: ["dist/src/migrations/*{.ts,.js}"],
});
