"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATED = exports.OK = exports.SuccessResponse = void 0;
const StatusCode = {
    OK: 200,
    CREATED: 201,
};
const ReasonStatusCode = {
    OK: "Success",
    CREATED: "Created!",
};
class SuccessResponse {
    constructor({ message = "", status = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {}, }) {
        this.message = message === "" ? reasonStatusCode : message;
        this.status = status;
        this.metadata = metadata;
    }
    send(res, header) {
        return res.status(this.status).json(this);
    }
}
exports.SuccessResponse = SuccessResponse;
class OK extends SuccessResponse {
    constructor({ metadata = {}, message = "" }) {
        super({ metadata, message });
    }
}
exports.OK = OK;
class CREATED extends SuccessResponse {
    constructor({ message = "", status = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, metadata = {}, }) {
        super({ message, status, reasonStatusCode, metadata });
    }
}
exports.CREATED = CREATED;
