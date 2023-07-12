import { JSONSchema } from "objection";
import { v4 } from "uuid";
import { nameToSlug } from "../utils/utils";
import { BaseModel } from "./basemodel";

export class RoleModel extends BaseModel {
  id!: string;
  role!: string;
  slug!: string;

  static tableName: string = "role";

  $beforeInsert(): void {
    this.id = v4();
    this.slug = nameToSlug(this.role);
    this.created_at = new Date();
  }

  $beforeUpdate(): void {
    this.slug = nameToSlug(this.role);
    this.updated_at = new Date();
  }

  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["role"],
    properties: {
      id: { type: "string" },
      role: { type: "string" },
      slug: { type: "string" },
    },
  };
}
