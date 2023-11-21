"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const project_entity_1 = require("./entity/project.entity");
const column_entity_1 = require("./entity/column.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456789",
    database: "pbl6_be",
    logging: true,
    entities: [user_entity_1.User, project_entity_1.Project, column_entity_1.Columns],
    migrationsRun: true,
    migrations: ["dist/src/migrations/*{.ts,.js}"],
});
