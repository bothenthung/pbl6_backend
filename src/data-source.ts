import { DataSource } from "typeorm"
import { User } from "./entity/user.entity"
import { Note } from "./entity/note.entity"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456789",
  database: "pbl6_be",
  logging: true,
  entities: [User, Note],
  migrationsRun: true,
  migrations: ["dist/src/migrations/*{.ts,.js}"],
})
