import QueryString from "qs";
import { UserEntity } from "../entities/User.entity";
import { parseQuery } from "../utils/pagination";

export default class UserService {
  async getAll(query: QueryString.ParsedQs) {
    const users = await UserEntity.find(parseQuery<UserEntity>(query, {
      select: {
        id: true,
        email: true,
        userName: true
      }
    }));
    return users;
  }
}