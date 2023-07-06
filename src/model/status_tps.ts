import { JSONSchema } from "objection";
import { BaseModel } from "./basemodel";

export class StatusTps extends BaseModel {
  static tableName: string = "status_tps";
  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["code", "icon", "color", "en", "ina"],
    properties: {
      id: { type: "integer" },
      code: { type: "string" },
      color: { type: "string" },
      en: { type: "string" },
      ina: { type: "string" },
    },
  };
}