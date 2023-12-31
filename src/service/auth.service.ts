import bcrypt from "bcrypt";
import {
  AuthFailureError,
  BadRequestError,
  ForbiddenError,
} from "../core/error.response";
import { AppDataSource } from "../data-source";
import { Auth } from "../types/authType";
import { creatTokenPair } from "../utils/auth";
import { CreateKey } from "../utils/createKey";
import { getInfoData } from "../utils/getInfoData";
import {
  findByEmail,
  findByRefreshToken,
  removeKeyById,
} from "../utils/user.utils";
import { UserEntity } from "../entities/User.entity";
import serverConfig from "../core/config";

class AuthService {
  /** @deprecated */
  static handlerRefreshToken = async (refreshToken: string) => {
    const user = await findByRefreshToken(refreshToken);
    if (!user)
      throw new ForbiddenError("Somethinh wrong happend !! Please relogin");
    const key = await CreateKey();
    const tokens = await creatTokenPair(
      {
        userId: user.userID,
        email: user.email,
        userName: user.userName,
      },
      key.privateKey
    );

    await AppDataSource.createQueryBuilder()
      .update(UserEntity)
      .set({ refreshToken: tokens?.refreshToken, publicKey: key.publicKey })
      .where("id = :id", { id: user.userID })
      .execute();

    return {
      user: getInfoData({
        fields: ["userID", "email", "userName"],
        dataObject: user,
      }),
      tokens,
    };
  };

  static async signup({ userName, email, password }: Auth) {
    const oldUser = await UserEntity.findOneBy({ email });

    if (oldUser) {
      throw new BadRequestError("Error: User already registered!");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const publicKey = serverConfig.jwtSecret;

    const newUser = new UserEntity();
    newUser.email = email;
    newUser.password = passwordHash;
    newUser.userName = userName;
    newUser.publicKey = serverConfig.jwtSecret;
    newUser.loginAt = new Date().toISOString();

    await newUser.save();

    const tokens = await creatTokenPair<UserEntity>(
      { id: newUser.id, email, userName, loginAt:  newUser.loginAt},
      publicKey
    );

    if (tokens) {
      newUser.refreshToken = tokens.refreshToken;
      await newUser.save();
    } else {
      console.error("Failed to generate tokens.");
    }

    const returnData = await UserEntity.getPublicDataById(newUser.id);

    return {
      user: returnData,
      tokens,
    };
  };

  static login = async ({ email, password }: Auth) => {
    const user = await UserEntity.findOneBy({ email });
    if (!user) throw new BadRequestError("User not registered");

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) throw new AuthFailureError("Authentication error");

    const publicKey = serverConfig.jwtSecret;
    const loginAt = new Date().toISOString();
    const tokens = await creatTokenPair<UserEntity>(
      {
        id: user.id,
        email: user.email,
        userName: user.userName,
        loginAt
      },
      serverConfig.jwtSecret
    );

    user.publicKey = publicKey;
    user.refreshToken = tokens?.refreshToken || null;
    user.loginAt = loginAt;

    await user.save();

    const returnData = await UserEntity.getPublicDataById(user.id);

    return {
      user: returnData,
      tokens,
    };
  };

  static logout = async (userReq: UserEntity) => {
    const user = await UserEntity.findOneBy({ id: userReq.id });
    
    if (!user) {
      throw new BadRequestError("User not found");
    }

    user.publicKey = null
    user.refreshToken = null
    user.loginAt = null

    user.save()

    return {};
  };
}
export default AuthService;
