import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express"
import { AppDataSource } from "./data-source"
import { User } from "./entity/user.entity"
import { routes } from "./routes"
import compression from "compression"
import morgan from "morgan"
import helmet from "helmet"
import * as dotenv from "dotenv"
import { ErrorResponse } from "./core/error.response"

dotenv.config({ path: __dirname + "/.env" })
const app = express()
app.use(helmet())
app.use(express.json())

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
    message: error.message || "Internal Server Error",
  })
}

app.use(errorHandler)

// app.use(
//   (error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
//     const statusCode: number = error.status || 500
//     return res.status(statusCode).json({
//       status: "error",
//       code: statusCode,
//       message: error.message || "Internal Server Error",
//     })
//   }
// )

export default app
