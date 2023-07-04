import {
  JSONSchema,
  Model,
  RelationMappings,
  RelationMappingsThunk,
  ValidationError,
} from "objection";
import { hashPass } from "../utils/utils";
import { BaseModel } from "./basemodel";
import { RoleModel } from "./roles";

export class UsersModel extends BaseModel {
  // phone!: string;
  // name!: string;
  id!: string;
  email!: string;
  role_id!: number;
  role!: string;
  password!: string | undefined;
  is_deleted!: boolean;

  async $beforeInsert() {
    this.password = hashPass(this.password!);
    let check = await UsersModel.query()
      .select("email")
      .where("email", this.email)
      .first();

    if (check) {
      return new ValidationError({
        message: "email already registered !",
        statusCode: 400,
        type: "string",
      });
    }
  }

  async $beforeUpdate() {
    if (this.password) {
      this.password = hashPass(this.password);
    }
    this.updated_at = new Date().toISOString();
    if (this.email) {
      let check = await UsersModel.query()
        .select("id", "email")
        .where("email", this.email)
        .first();

      if (check && check.email !== this.email) {
        return new ValidationError({
          message: "email already registered !",
          statusCode: 400,
          type: "string",
        });
      }
    }
  }

  static tableName: string = "users";
  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["name", "email", "phone", "password", "role_id"],
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      email: { type: "string" },
      phone: { type: "string" },
      email_verified_at: { type: "string" },
      password: { type: "string" },
      remember_token: { type: "string" },
      photo: { type: "string" },
      role_id: { type: "integer" },
      is_deleted: { type: "boolean" },
      status: { type: "boolean" },
      notification_token: { type: "string" },
    },
  };

  static relationMappings: RelationMappings | RelationMappingsThunk = () => ({
    role: {
      relation: Model.HasOneRelation,
      modelClass: RoleModel,

      join: {
        from: "users.role_id",
        to: "role.id",
      },
    },
  });
}
