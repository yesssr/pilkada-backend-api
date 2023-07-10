import {
  AnyQueryBuilder,
  JSONSchema,
  Model,
  Modifiers,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";
import { v4 as uuidv4 } from "uuid";
import { BaseModel } from "./basemodel";
import { KontestanPeriodModel } from "./kontestan.period";
import { StatusKontestan } from "./status_kontestan";
import { nameToSlug } from "../utils/utils";
import { UsersModel } from "./users";
import { Tps } from "./tps";
import { Elections } from "./election";

export class KontestanModel extends BaseModel {
  id!: string;
  slug!: string;
  title!: string;
  status!: number;
  created_by!: string;

  static tableName: string = "kontestan";
  $beforeInsert() {
    this.id = uuidv4();
    this.status = 1;
    this.slug = nameToSlug(this.title);
  }

  $beforeUpdate() {
    if (this.title) this.slug = nameToSlug(this.title);
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

    elections: {
      relation: Model.HasManyRelation,
      modelClass: Elections,

      join: {
        from: "kontestan.id",
        // through: {
        //   from: "elections.kontestan_id",
        //   to: "elections.tps_code",
        // },
        to: "elections.kontestan_id",
      },
    },
  });

  static modifiers: Modifiers<AnyQueryBuilder> = {
    mod_get_elections(query) {
      query
        .withGraphFetched("elections")
        .modifyGraph("elections", (builder) => {
          builder
            .select("tps_code", "tps.name as tps")
            .count("elections.id", { as: "summary" })
            .from("elections")
            .groupBy("kontestan_id", "tps_code")
            .joinRelated("tps");
        });
    },
  };
}
