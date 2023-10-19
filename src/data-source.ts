import { DataSource } from "typeorm"
import { User } from "./entity/user.entity"
import { Note } from "./entity/note.entity"
import { toNumber } from "lodash"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: toNumber(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  entities: [User, Note],
  migrationsRun: true,
  migrations: ["dist/src/migrations/*{.ts,.js}"],
})
