import {
  AnyQueryBuilder,
  JSONSchema,
  Model,
  Modifiers,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";
import { v4 } from "uuid";
import { getUniqueNumber, nameToSlug } from "../utils/utils";
import { StatusTps } from "./status_tps";
import { BaseModel } from "./basemodel";
import { Districts } from "./districts";
import { Provinces } from "./provinces";
import { Regencies } from "./regencies";
import { Villages } from "./villages";
import { UsersModel } from "./users";
import { KontestanModel } from "./kontestan";
import { Elections } from "./election";

export class Tps extends BaseModel {
  id!: string;
  code!: string;
  is_deleted!: boolean;
  slug!: string;
  status!: number;
  name!: string;

  $beforeInsert(): void {
    if (!this.code) this.code = getUniqueNumber();

    this.id = v4();
    this.status = 1;
    this.slug = nameToSlug(this.name);
    this.is_deleted = false;
  }

  $beforeUpdate(): void {
    if (this.name) this.slug = nameToSlug(this.name);
  }

  static tableName: string = "tps";

  static jsonSchema: JSONSchema = {
    type: "object",
    required: [
      "user_id",
      "name",
      "province_id",
      "regency_id",
      "district_id",
      "village_id",
      "address",
      "latitude",
      "longitude",
      "status",
    ],
    properties: {
      id: { type: "string" },
      user_id: { type: "string" },
      name: { type: "string" },
      slug: { type: "string" },
      province_id: { type: "string" },
      regency_id: { type: "string" },
      district_id: { type: "string" },
      village_id: { type: "string" },
      address: { type: "string" },
      desc: { type: "string" },
      latitude: { type: "string" },
      longitude: { type: "string" },
      status: { type: "integer" },
    },
  };

  static relationMappings: RelationMappings | RelationMappingsThunk = () => ({
    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: UsersModel,

      join: {
        from: "tps.user_id",
        to: "users.id",
      },
    },

    provinces: {
      relation: Model.BelongsToOneRelation,
      modelClass: Provinces,

      join: {
        from: "tps.province_id",
        to: "provinces.id",
      },
    },

    regencies: {
      relation: Model.BelongsToOneRelation,
      modelClass: Regencies,

      join: {
        from: "tps.regency_id",
        to: "regencies.id",
      },
    },

    districts: {
      relation: Model.BelongsToOneRelation,
      modelClass: Districts,

      join: {
        from: "tps.district_id",
        to: "districts.id",
      },
    },

    villages: {
      relation: Model.BelongsToOneRelation,
      modelClass: Villages,

      join: {
        from: "tps.village_id",
        to: "villages.id",
      },
    },

    status_tps: {
      relation: Model.BelongsToOneRelation,
      modelClass: StatusTps,

      join: {
        from: "tps.status",
        to: "status_tps.code",
      },
    },

    elections: {
      relation: Model.HasManyRelation,
      modelClass: Elections,

      join: {
        from: "tps.code",
        // through: {
        //   from: "elections.tps_code",
        //   to: "elections.kontestan_id",
        // },
        to: "elections.tps_code",
      },
    },
  });

  static modifiers: Modifiers<AnyQueryBuilder> = {
    mod_get_elections(query) {
      query
        .withGraphFetched("elections")
        .modifyGraph("elections", (builder) => {
          builder
            .select("kontestan_id", "kontestan:users.name as kontestan")
            .count("elections.id", { as: "summary" })
            .from("elections")
            .groupBy("kontestan_id", "tps_code")
            .joinRelated("kontestan")
            .joinRelated("kontestan.users");
        });
    },
  };
}
