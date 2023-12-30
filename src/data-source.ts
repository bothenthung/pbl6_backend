import { DataSource } from "typeorm"
import { Columns } from "./entity/column.entity"
import { MessageEntity } from "./entity/message.entity"
import { Project } from "./entity/project.entity"
import { Task } from "./entity/task.entity"
import { User } from "./entity/user.entity"
import { UserProject } from "./entity/userProject.entity"
import { InvitationEntity } from "./entity/invitation.entity"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "Abc123@@",
  database: "pbl6_final",
  logging: true,
  entities: [User, Project, Columns, Task, MessageEntity , UserProject , InvitationEntity],
  migrationsRun: true,
  migrations: ["dist/src/migrations/*{.ts,.js}"],
})
