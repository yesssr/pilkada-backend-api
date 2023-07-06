import {
  JSONSchema,
  Model,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";
import { v4 as uuidv4 } from "uuid";
import { BaseModel } from "./basemodel";
import { KontestanPeriodModel } from "./kontestan.period";
import { StatusKontestan } from "./status_kontestan";
import { nameToSlug } from "../utils/utils";
import { UsersModel } from "./users";

export class KontestanModel extends BaseModel {
  id!: string;
  slug!: string;
  title!: string;
  created_by!: string;

  static tableName: string = "kontestan";
  $beforeInsert() {
    this.id = uuidv4();
    this.slug = nameToSlug(this.title.split(" ")[0]);
  }

  $beforeUpdate() {
    if (this.title) this.slug = nameToSlug(this.title.split(" ")[0]);
  }

  static jsonSchema: JSONSchema = {
    type: "object",
    required: [
      "service_id",
      "user_id",
      "banner",
      "title",
      "description",
      "url",
      "status",
      "created_by",
    ],
    properties: {
      id: { type: "string" },
      service_id: { type: "string" },
      user_id: { type: "string" },
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

    kontestan_period: {
      relation: Model.BelongsToOneRelation,
      modelClass: KontestanPeriodModel,

      join: {
        from: "kontestan.service_id",
        to: "kontestan_period.id",
      },
    },

    status_kontestan: {
      relation: Model.BelongsToOneRelation,
      modelClass: StatusKontestan,

      join: {
        from: "kontestan.status",
        to: "status_kontestan.code",
      },
    },
  });
}
