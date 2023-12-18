import {
  AnyQueryBuilder,
  JSONSchema,
  Model,
  Modifiers,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";
import { SendError } from "../middleware/error";
import { KontestanModel } from "./kontestan";
import { BaseModel } from "./basemodel";
import { UsersModel } from "./users";
import { Tps } from "./tps";

export class Elections extends BaseModel {
  poin!: number;
  type!: string;
  photo!: string;
  kontestan_id!: string;
  user_id!: string;
  nik!: string;
  created_by!: string;

  static tableName: string = "elections";

  static jsonSchema: JSONSchema = {
    type: "object",
    required: [
      "tps_code",
      "nik",
      "name",
      "address",
      "kontestan_id",
      "type",
      "created_by",
    ],
    properties: {
      id: { type: "integer" },
      user_id: { type: "string" },
      tps_code: { type: "string" },
      kontestan_id: { type: "string" },
      nik: { type: "string" },
      name: { type: "string" },
      photo: { type: "string" },
      poin: { type: "string" },
      type: {
        type: "string",
        enum: ["import", "submit"],
      },
      created_by: { type: "string" },
    },
  };

  static relationMappings: RelationMappings | RelationMappingsThunk = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UsersModel,

      join: {
        from: "elections.created_by",
        to: "users.id",
      },
    },

    tps: {
      relation: Model.BelongsToOneRelation,
      modelClass: Tps,

      join: {
        from: "elections.tps_code",
        to: "tps.code",
      },
    },

    kontestan: {
      relation: Model.BelongsToOneRelation,
      modelClass: KontestanModel,

      join: {
        from: "elections.kontestan_id",
        to: "kontestan.id",
      },
    },
  });

  static modifiers: Modifiers<AnyQueryBuilder> = {
    mod_get_kontestan_elections(query, kontestan_id) {
      query
        .withGraphFetched("kontestan")
        .modifyGraph("kontestan", (builder) => {
          builder
            .count("id")
            .where("kontestan_id", kontestan_id)
            .from("elections");
        });
    },
  };
}
