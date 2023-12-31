import compression from "compression"
import cors from "cors"
import * as dotenv from 'dotenv'
import express, { ErrorRequestHandler } from "express"
import helmet from "helmet"
import http from 'http'
import morgan from "morgan"
import socketio from 'socket.io'
import { AppDataSource } from "./data-source"
import { socketServices } from "./service/socket.service"
import routes from "./routes";
import authentication from "./middlewares/authentication";

dotenv.config()
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

app.all("*", authentication)
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

const httpsServer = http.createServer(app);

const io = new socketio.Server(httpsServer, {
  cors: {
    origin: '*',
  }
});


(global as any).socket = io ;

(global as any).socket.on('connection', socketServices);

export default httpsServer;
