"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFailureError = exports.BadRequestError = exports.ConflictRequestError = exports.ErrorResponse = void 0;
const httpStatusCode_1 = require("../utils/httpStatusCode");
const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
};
const ReasonStatusCode = {
    FORBIDDEN: "Bad request error",
    CONFLICT: "Conflict error",
};
class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.ErrorResponse = ErrorResponse;
class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode);
    }
}
exports.ConflictRequestError = ConflictRequestError;
class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode);
    }
}
exports.BadRequestError = BadRequestError;
class AuthFailureError extends ErrorResponse {
    constructor(message = httpStatusCode_1.ReasonPhrases.UNAUTHORIZED, statusCode = httpStatusCode_1.StatusCodes.UNAUTHORIZED) {
        super(message, statusCode);
    }
}
exports.AuthFailureError = AuthFailureError;
