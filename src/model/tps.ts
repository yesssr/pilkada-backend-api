import {
  JSONSchema,
  Model,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";
import { v4 } from "uuid";
import { nameToSlug } from "../utils/utils";
import { BaseModel } from "./basemodel";
import { Districts } from "./districts";
import { Provinces } from "./provinces";
import { Regencies } from "./regencies";
import { StatusTps } from "./status_tps";
import { UsersModel } from "./users";
import { Villages } from "./villages";

export class Tps extends BaseModel {
  id!: string;
  is_deleted!: boolean;
  slug!: string;
  status!: number;
  name!: string;

  $beforeInsert(): void {
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
  });
}
