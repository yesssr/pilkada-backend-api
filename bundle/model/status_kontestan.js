"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusKontestan = void 0;
const basemodel_1 = require("./basemodel");
class StatusKontestan extends basemodel_1.BaseModel {
}
exports.StatusKontestan = StatusKontestan;
StatusKontestan.tableName = "status_kontestan";
StatusKontestan.jsonSchema = {
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
