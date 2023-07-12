import {
  JSONSchema,
  Model,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";
import { BaseModel } from "./basemodel";
import { UsersModel } from "./users";

export class Bearers extends BaseModel {
  static tableName: string = "bearers";

  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["name", "codename"],
    properties: {
      id: { type: "integer" },
      name: { type: "string" },
      codename: { type: "string" },
      logo: { type: "string" },
    },
  };

  static relationMappings: RelationMappings | RelationMappingsThunk = () => ({
    users: {
      relation: Model.HasManyRelation,
      modelClass: UsersModel,

      join: {
        from: "bearers.id",
        to: "users.bearer_id",
      },
    },
  });
}
