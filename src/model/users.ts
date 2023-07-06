import {
  JSONSchema,
  Model,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";
import { v4 as uuidv4 } from "uuid";
import { localError } from "../middleware/error";
import { hashPass } from "../utils/utils";
import { BaseModel } from "./basemodel";
import { RoleModel } from "./roles";
import { StatusUser } from "./status_user";
import { UserTokens } from "./user_tokens";

export class UsersModel extends BaseModel {
  phone!: string;
  name!: string;
  id!: string;
  email!: string;
  role_id!: number;
  role!: string;
  slug!: string;
  status!: number;
  password!: string | undefined;
  is_deleted!: boolean;

  async $beforeInsert() {
    this.id = uuidv4();
    this.status = 1;
    this.password = hashPass(this.password!);
    let check = await UsersModel.query()
      .select("email")
      .where("email", this.email)
      .first();

    if (check) {
      let err = new localError();
      err.message = "email already registered !";
      err.statusCode = 400;
      throw err;
    }
  }

  async $beforeUpdate() {
    if (this.password) {
      this.password = hashPass(this.password);
    }
    if (this.email) {
      let check = await UsersModel.query()
        .select("id", "email")
        .where("email", this.email)
        .first();

      if (check && check.email !== this.email) {
        let err = new localError();
        err.message = "email already registered !";
        err.statusCode = 400;
        throw err;
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
      password: { type: "string", minLength: 8 },
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

    status_user: {
      relation: Model.BelongsToOneRelation,
      modelClass: StatusUser,

      join: {
        from: "users.status",
        to: "status_user.code",
      },
    },

    user_token: {
      relation: Model.HasOneRelation,
      modelClass: UserTokens,

      join: {
        from: "users.id",
        to: "user_tokens.user_id",
      },
    },
  });
}
