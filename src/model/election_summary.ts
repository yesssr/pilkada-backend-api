import {
  JSONSchema,
  Model,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";
import { v4 as uuidv4 } from "uuid";
import { KontestanModel } from "./kontestan";
import { BaseModel } from "./basemodel";
import { UsersModel } from "./users";
import { Tps } from "./tps";

export class ElectionSummary extends BaseModel {
  id?: string;
  user_id!: string;
  tps_code!: string;
  kontestan_id!: string;
  summary!: number;

  static tableName: string = "election_summary";

  $beforeInsert(): void {
    this.id = uuidv4();
  }
  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["user_id", "tps_code", "kontestan_id", "summary"],
    properties: {
      id: { type: "string" },
      user_id: { type: "string" },
      tps_code: { type: "string" },
      kontestan_id: { type: "string" },
      summary: { type: "integer" },
    },
  };

  static relationMappings: RelationMappings | RelationMappingsThunk = () => ({
    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: UsersModel,

      join: {
        from: "election_summary.user_id",
        to: "users.id",
      },
    },

    kontestan: {
      relation: Model.BelongsToOneRelation,
      modelClass: KontestanModel,

      join: {
        from: "election_summary.kontestan_id",
        to: "kontestan.id",
      },
    },

    tps: {
      relation: Model.BelongsToOneRelation,
      modelClass: Tps,

      join: {
        from: "election_summary.tps_code",
        to: "tps.code",
      },
    },
  });
}
