import { JSONSchema } from "objection";
import { BaseModel } from "./basemodel";

export class RoleModel extends BaseModel {
  static tableName: string = "role";
  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["id", "role", "slug"],
    properties: {
      id: { type: "integer" },
      role: { type: "string" },
      slug: { type: "string" },
    },
  };
}
