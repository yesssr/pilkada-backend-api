import { UserTokens } from "../model/user_tokens";
import { getUniqueNumber } from "../utils/utils";

export class UserTokenService {
  static getAllToken = async (status?: string) => {
    let query = UserTokens.query()
      .select(
        "user_tokens.id",
        "user_tokens.user_id",
        "user.name as user",
        "user_tokens.token",
        "user_tokens.status",
        "user_tokens.created_at",
        "user_tokens.updated_at"
      )
      .leftJoinRelated("user");

    if (status) query.where("user_tokens.status", status);
    return await query;
  };

  static getByTokenId = (id: string) => {
    return UserTokens.query()
      .select(
        "user_tokens.id",
        "user_tokens.user_id",
        "user.name as user",
        "user_tokens.token",
        "user_tokens.status",
        "user_tokens.created_at",
        "user_tokens.updated_at"
      )
      .leftJoinRelated("user")
      .where("user_tokens.id", id);
  };

  static generateToken = async (total: number) => {
    let result = [];
    for (let i = 0; i < total; i++) {
      let query = await UserTokens.query().insert({
        token: getUniqueNumber(),
        status: "available",
      });
      result.push(query);
    }
    return result;
  };

  static deleteById = (id: string) => {
    return UserTokens.query().where("id", id).delete();
  };

  static checkStatusToken = (token: string) => {
    return UserTokens.query()
      .select("status", "role_id")
      .where("token", token)
      .first();
  };

  static addUserIdToToken = (user_id: string, token: string) => {
    return UserTokens.query()
      .update({ user_id: user_id, status: "used" })
      .where("token", token);
  };
}
