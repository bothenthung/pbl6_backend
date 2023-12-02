import { DataSource } from "typeorm"
import { Columns } from "./entity/column.entity"
import { MessageEntity } from "./entity/message.entity"
import { Project } from "./entity/project.entity"
import { Task } from "./entity/task.entity"
import { User } from "./entity/user.entity"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "12345678",
  database: "pbl6",
  logging: true,
  entities: [User, Project, Columns, Task , MessageEntity],
  migrationsRun: true,
  migrations: ["dist/src/migrations/*{.ts,.js}"],
})
