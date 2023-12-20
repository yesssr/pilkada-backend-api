"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bearers = void 0;
const objection_1 = require("objection");
const basemodel_1 = require("./basemodel");
const users_1 = require("./users");
class Bearers extends basemodel_1.BaseModel {
}
exports.Bearers = Bearers;
Bearers.tableName = "bearers";
Bearers.jsonSchema = {
    type: "object",
    required: ["name", "codename"],
    properties: {
        id: { type: "integer" },
        name: { type: "string" },
        codename: { type: "string" },
        logo: { type: "string" },
    },
};
Bearers.relationMappings = () => ({
    users: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: users_1.UsersModel,
        join: {
            from: "bearers.id",
            to: "users.bearer_id",
        },
    },
});
