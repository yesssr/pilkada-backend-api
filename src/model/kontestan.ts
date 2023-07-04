import {
  JSONSchema,
  Model,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";
import { BaseModel } from "./basemodel";
import { UsersModel } from "./users";

export class KontestanModel extends BaseModel {
  static tableName: string = "kontestan";
  static jsonSchema: JSONSchema = {
    type: "object",
    required: [
      "service_id",
      "user_id",
      "banner",
      "title",
      "slug",
      "description",
      "url",
      "status",
      "created_by",
    ],
    properties: {
      id: { type: "string" },
      service_id: { type: "char" },
      user_id: { type: "char" },
      date_start: { type: "string" },
      banner: { type: "string" },
      title: { type: "string" },
      slug: { type: "string" },
      description: { type: "string" },
      url: { type: "string" },
      status: { type: "string" },
      created_by: { type: "string" },
    },
  };
  static relationMappings: RelationMappings | RelationMappingsThunk = () => ({
    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: UsersModel,

      join: {
        from: "kontestan.user_id",
        to: "users.id",
      },
    },
  });
}
