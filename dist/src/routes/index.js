"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_1 = require("./auth");
exports.routes = (0, express_1.Router)();
exports.routes.use("/v1/api", auth_1.authRouter);
