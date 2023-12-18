"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elections = void 0;
const objection_1 = require("objection");
const kontestan_1 = require("./kontestan");
const basemodel_1 = require("./basemodel");
const users_1 = require("./users");
const tps_1 = require("./tps");
class Elections extends basemodel_1.BaseModel {
}
exports.Elections = Elections;
Elections.tableName = "elections";
Elections.jsonSchema = {
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
Elections.relationMappings = () => ({
    user: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: users_1.UsersModel,
        join: {
            from: "elections.created_by",
            to: "users.id",
        },
    },
    tps: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: tps_1.Tps,
        join: {
            from: "elections.tps_code",
            to: "tps.code",
        },
    },
    kontestan: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: kontestan_1.KontestanModel,
        join: {
            from: "elections.kontestan_id",
            to: "kontestan.id",
        },
    },
});
Elections.modifiers = {
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
