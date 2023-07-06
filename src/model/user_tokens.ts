import {
  JSONSchema,
  Model,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";
import { BaseModel } from "./basemodel";
import { UsersModel } from "./users";

export class UserTokens extends BaseModel {
  id!: number;
  user_id!: string;
  token!: string;
  status!: string;

  static tableName: string = "user_tokens";

  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["status"],
    properties: {
      id: { type: "integer" },
      user_id: { type: "string" },
      token: { type: "string" },
    },
  };

  static relationMappings: RelationMappings | RelationMappingsThunk = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UsersModel,

      join: {
        from: "user_tokens.user_id",
        to: "users.id",
      },
    },
  });
}
