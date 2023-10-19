"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const routes_1 = require("./routes");
const helmet_1 = __importDefault(require("helmet"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + "/.env" });
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized");
})
    .catch((error) => {
    console.log("Loi ket noi database", error);
});
app.use("/", routes_1.routes);
const errorHandler = (error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        message: error.message || "Internal Server Error",
    });
};
app.use(errorHandler);
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
exports.default = app;
