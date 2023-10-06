import { Request, Response } from "express"
import { Icc } from "../types/SuccessResponse"

const StatusCode = {
  OK: 200,
  CREATED: 201,
}

const ReasonStatusCode = {
  OK: "Success",
  CREATED: "Created!",
}

export class SuccessResponse {
  message: string
  status: number
  metadata: object
  reasonStatusCode: string
  // constructor({ message, status, reasonStatusCode, metadata }: Icc) {
  constructor({
    message = "",
    status = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {},
  }) {
    this.message = message === "" ? reasonStatusCode : message
    this.status = status
    this.metadata = metadata
  }
  send(res: Response, header: {}) {
    return res.status(this.status).json(this)
  }
}

export class OK extends SuccessResponse {
  constructor({ metadata = {}, message = "" }) {
    super({ metadata, message })
  }
}

export class CREATED extends SuccessResponse {
  constructor({
    message = "",
    status = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    metadata = {},
  }) {
    super({ message, status, reasonStatusCode, metadata })
  }
}
