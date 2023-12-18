"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectionSummary = void 0;
const objection_1 = require("objection");
const uuid_1 = require("uuid");
const kontestan_1 = require("./kontestan");
const basemodel_1 = require("./basemodel");
const users_1 = require("./users");
const tps_1 = require("./tps");
class ElectionSummary extends basemodel_1.BaseModel {
    $beforeInsert() {
        this.id = (0, uuid_1.v4)();
    }
}
exports.ElectionSummary = ElectionSummary;
ElectionSummary.tableName = "election_summary";
ElectionSummary.jsonSchema = {
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
ElectionSummary.relationMappings = () => ({
    users: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: users_1.UsersModel,
        join: {
            from: "election_summary.user_id",
            to: "users.id",
        },
    },
    kontestan: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: kontestan_1.KontestanModel,
        join: {
            from: "election_summary.kontestan_id",
            to: "kontestan.id",
        },
    },
    tps: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: tps_1.Tps,
        join: {
            from: "election_summary.tps_code",
            to: "tps.code",
        },
    },
});
