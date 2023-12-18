"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KontestanPeriodModel = void 0;
const basemodel_1 = require("./basemodel");
class KontestanPeriodModel extends basemodel_1.BaseModel {
}
exports.KontestanPeriodModel = KontestanPeriodModel;
KontestanPeriodModel.tableName = "kontestan_period";
KontestanPeriodModel.jsonSchema = {
    type: "object",
    required: ["service_name", "priority_id", "duration"],
    properties: {
        id: { type: "string" },
        service_name: { type: "string" },
        priority_id: { type: "string" },
        duration: { type: "integer" },
    },
};
