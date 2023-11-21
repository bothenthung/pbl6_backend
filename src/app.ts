import express, { ErrorRequestHandler } from "express"
import { AppDataSource } from "./data-source"
import { routes } from "./routes"
import compression from "compression"
import morgan from "morgan"
import helmet from "helmet"
import * as dotenv from "dotenv"
import cors from "cors"

dotenv.config({ path: __dirname + "/.env" })
const app = express()

app.use(helmet())
app.use(express.json())
app.use(cors())
app.use(compression())
app.use(morgan("dev"))

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized")
  })
  .catch((error) => {
    console.log("Loi ket noi database", error)
  })

app.use("/", routes)

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const statusCode: number = error.status || 500
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: error.stack,
    message: error.message || "Internal Server Error",
  })
}

app.use(errorHandler)

export default app
