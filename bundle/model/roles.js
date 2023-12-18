"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const basemodel_1 = require("./basemodel");
class RoleModel extends basemodel_1.BaseModel {
    $beforeInsert() {
        this.id = (0, uuid_1.v4)();
        this.slug = (0, utils_1.nameToSlug)(this.role);
        this.created_at = new Date();
    }
    $beforeUpdate() {
        this.slug = (0, utils_1.nameToSlug)(this.role);
        this.updated_at = new Date();
    }
}
exports.RoleModel = RoleModel;
RoleModel.tableName = "role";
RoleModel.jsonSchema = {
    type: "object",
    required: ["role"],
    properties: {
        id: { type: "string" },
        role: { type: "string" },
        slug: { type: "string" },
    },
};
