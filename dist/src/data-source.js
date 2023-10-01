"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const note_entity_1 = require("./entity/note.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456789",
    database: "pbl6_be",
    logging: true,
    // entities: ["dist/src/entity/*.entity{.ts,.js}",],
    entities: [user_entity_1.User, note_entity_1.Note],
    migrationsRun: true,
    migrations: ["dist/src/migrations/*{.ts,.js}"],
});
