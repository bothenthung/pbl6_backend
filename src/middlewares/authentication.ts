import { verify } from "jsonwebtoken";
import { RequestHandler } from "express";
import { UserEntity } from "../entities/User.entity";
import serverConfig from "../core/config";

const authentication: RequestHandler = (req, res, next) => {
  const nonSecurePaths = ["/signup", "/login"]

  if (nonSecurePaths.includes(req.path.replace("/v1/api", ""))) return next();

  const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    verify(token, serverConfig.jwtSecret as string, async (err, reqUser) => {
        if (err) return res.sendStatus(403);

        
        const user = await UserEntity.findOneBy({ id: (reqUser as UserEntity)?.id })
        

        if (!user || user.loginAt !== (reqUser as UserEntity)?.loginAt) {
          return res.sendStatus(403);
        }

        req.user = user

        return next();
    });
}

export default authentication;