"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusTps = void 0;
const basemodel_1 = require("./basemodel");
class StatusTps extends basemodel_1.BaseModel {
}
exports.StatusTps = StatusTps;
StatusTps.tableName = "status_tps";
StatusTps.jsonSchema = {
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
