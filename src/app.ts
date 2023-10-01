import express from "express"
import { AppDataSource } from "./data-source"
import { User } from "./entity/user.entity"
import { routes } from "./routes"

const app = express()

app.use(express.json())

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized")
  })
  .catch((error) => {
    console.log("Loi ket noi database", error)
  })

app.use("/", routes)

export default app
