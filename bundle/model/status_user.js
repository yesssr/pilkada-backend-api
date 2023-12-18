"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusUser = void 0;
const basemodel_1 = require("./basemodel");
class StatusUser extends basemodel_1.BaseModel {
}
exports.StatusUser = StatusUser;
StatusUser.tableName = "status_user";
StatusUser.jsonSchema = {
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
