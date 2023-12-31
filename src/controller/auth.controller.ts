import { NextFunction, Request, RequestHandler, Response } from "express";
import authService from "../service/auth.service";
import { OK, CREATED, SuccessResponse } from "../core/success.reponse";
import { catchAsync } from "../utils/asyncHandler";

class AuthController {
  /** @deprecated */
  handleRefreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    new SuccessResponse({
      message: "Refresh Token success ",
      metadata: await authService.handlerRefreshToken(req.refreshToken),
    }).send(res, {});
  };

  signup = catchAsync(async (req, res) => {
    const metadata = await authService.signup(req.body)

    new CREATED({
      message: "User created successfully",
      metadata,
    }).send(res);
  });

  login = catchAsync(async (req, res) => {
    const metadata = await authService.login(req.body)
    new OK({
      message: "Login success!",
      metadata,
    }).send(res);
  });

  logout = catchAsync(async (req, res) => {
    const metadata = await authService.logout(req.user)

    new SuccessResponse({
      message: "logout success ",
      metadata,
    }).send(res);
  });
}

export default new AuthController();
