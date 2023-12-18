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
import { Elections } from "./election";
import { Villages } from "./villages";
import { UsersModel } from "./users";
import { Bearers } from "./bearers";
import { ElectionSummary } from "./election_summary";

export class Tps extends BaseModel {
  id!: string;
  user_id!: string;
  code!: string;
  bearer_id!: number;
  is_deleted!: boolean;
  slug!: string;
  status!: number;
  name!: string;

  $beforeInsert(): void {
    if (!this.code) this.code = getUniqueNumber();

    this.created_at = new Date();
    this.id = v4();
    this.status = 1;
    this.slug = nameToSlug(this.name);
    this.is_deleted = false;
  }

  $beforeUpdate(): void {
    this.updated_at = new Date();
    if (this.name) this.slug = nameToSlug(this.name);
  }

  static tableName: string = "tps";

  static jsonSchema: JSONSchema = {
    type: "object",
    required: [
      "user_id",
      "name",
      "bearer_id",
      "province_id",
      "regency_id",
      "district_id",
      "village_id",
      "address",
      "latitude",
      "longitude",
    ],
    properties: {
      id: { type: "string" },
      user_id: { type: "string" },
      name: { type: "string" },
      slug: { type: "string" },
      bearer_id: { type: "integer" },
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
    bearers: {
      relation: Model.BelongsToOneRelation,
      modelClass: Bearers,

      join: {
        from: "tps.bearer_id",
        to: "bearers.id",
      },
    },

    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: UsersModel,

      join: {
        from: "tps.user_id",
        to: "users.id",
      },
    },

    auditor: {
      relation: Model.HasManyRelation,
      modelClass: UsersModel,

      join: {
        from: "tps.code",
        to: "users.tps_code",
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

    election_s: {
      relation: Model.HasManyRelation,
      modelClass: ElectionSummary,

      join: {
        from: "tps.code",
        // through: {
        //   from: "elections.tps_code",
        //   to: "elections.kontestan_id",
        // },
        to: "election_summary.tps_code",
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

    mod_get_auditor(query, bearer_id) {
      query.withGraphFetched("auditor").modifyGraph("auditor", (builder) => {
        builder
          .select(
            "users.id",
            "users.name",
            "users.bearer_id",
            "bearers.codename"
          )
          .from("users")
          .joinRelated("bearers")
          .where("users.is_deleted", false)
          .andWhere("users.bearer_id", bearer_id);
      });
    },
  };
}
