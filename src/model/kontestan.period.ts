import { JSONSchema } from "objection";
import { BaseModel } from "./basemodel";

export class KontestanPeriodModel extends BaseModel {
  static tableName: string = "kontestan_period";
  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["service_name", "priority_id", "duration"],
    properties: {
      id: { type: "string" },
      service_name: { type: "string" },
      priority_id: { type: "string" },
      duration: { type: "integer" },
    },
  };
}
