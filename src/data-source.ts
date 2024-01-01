import { DataSource } from "typeorm";
import serverConfig from "./core/config";
import { ColumnEntity } from "./entities/Column.entity";
import { MessageEntity } from "./entities/Message.entity";
import { NotificationEntity } from "./entities/Notification.entity";
import { ProjectEntity } from "./entities/Project.entity";
import { ProjectUserEntity } from "./entities/ProjectUser.entity";
import { TaskEntity } from "./entities/Task.entity";
import { UserEntity } from "./entities/User.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: serverConfig.dbHost,
  port: serverConfig.dbPort,
  username: serverConfig.dbUser,
  password: serverConfig.dbPassword,
  database: serverConfig.dbName,
  logging: true,
  entities: [
    ColumnEntity,
    MessageEntity,
    NotificationEntity,
    ProjectEntity,
    ProjectUserEntity,
    TaskEntity,
    UserEntity
  ],
  migrationsRun: true,
  migrations: ["dist/src/migrations/*{.ts,.js}"],
});
