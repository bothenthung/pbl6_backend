import { DataSource } from "typeorm"
import { User } from "./entity/user.entity"
import { Project } from "./entity/project.entity"
import { Columns } from "./entity/column.entity"
import { Task } from "./entity/task.entity"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456789",
  database: "pbl6_be",
  logging: true,
  entities: [User, Project, Columns, Task],
  migrationsRun: true,
  migrations: ["dist/src/migrations/*{.ts,.js}"],
})
