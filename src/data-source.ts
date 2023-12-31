import { DataSource } from "typeorm";
import { ColumnEntity } from "./entities/Column.entity";
import { InvitationEntity } from "./entities/Invitation.entity";
import { MessageEntity } from "./entities/Message.entity";
import { ProjectEntity } from "./entities/Project.entity";
import { TaskEntity } from "./entities/Task.entity";
import { UserEntity } from "./entities/User.entity";
import { NotificationEntity } from "./entities/Notification.entity";
import { ProjectUserEntity } from "./entities/ProjectUser.entity";
import serverConfig from "./core/config";

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
    InvitationEntity,
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
