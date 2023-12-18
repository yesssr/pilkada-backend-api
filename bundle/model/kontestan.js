"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KontestanModel = void 0;
const objection_1 = require("objection");
const uuid_1 = require("uuid");
const kontestan_period_1 = require("./kontestan.period");
const status_kontestan_1 = require("./status_kontestan");
const utils_1 = require("../utils/utils");
const basemodel_1 = require("./basemodel");
const election_1 = require("./election");
const users_1 = require("./users");
class KontestanModel extends basemodel_1.BaseModel {
    $beforeInsert() {
        this.id = (0, uuid_1.v4)();
        this.status = 1;
        this.slug = (0, utils_1.nameToSlug)(this.title);
        this.created_at = new Date();
    }
    $beforeUpdate() {
        if (this.title)
            this.slug = (0, utils_1.nameToSlug)(this.title);
        this.updated_at = new Date();
    }
}
exports.KontestanModel = KontestanModel;
KontestanModel.tableName = "kontestan";
KontestanModel.jsonSchema = {
    type: "object",
    required: ["user_id", "banner", "title", "description", "created_by"],
    properties: {
        id: { type: "string" },
        service_id: { type: "string" },
        bearer_id: { type: "number" },
        user_id: { type: "string" },
        date_start: { type: "string" },
        banner: { type: "string" },
        title: { type: "string" },
        slug: { type: "string" },
        description: { type: "string" },
        url: { type: "string" },
        status: { type: "string" },
        created_by: { type: "string" },
    },
};
KontestanModel.relationMappings = () => ({
    users: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: users_1.UsersModel,
        join: {
            from: "kontestan.user_id",
            to: "users.id",
        },
    },
    created: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: users_1.UsersModel,
        join: {
            from: "kontestan.created_by",
            to: "users.id",
        },
    },
    kontestan_period: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: kontestan_period_1.KontestanPeriodModel,
        join: {
            from: "kontestan.service_id",
            to: "kontestan_period.id",
        },
    },
    status_kontestan: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: status_kontestan_1.StatusKontestan,
        join: {
            from: "kontestan.status",
            to: "status_kontestan.code",
        },
    },
    elections: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: election_1.Elections,
        join: {
            from: "kontestan.id",
            // through: {
            //   from: "elections.kontestan_id",
            //   to: "elections.tps_code",
            // },
            to: "elections.kontestan_id",
        },
    },
});
KontestanModel.modifiers = {
    mod_get_elections(query) {
        query
            .withGraphFetched("elections")
            .modifyGraph("elections", (builder) => {
            builder
                .select("tps_code", "tps.name as tps")
                .count("elections.id", { as: "summary" })
                .from("elections")
                .groupBy("kontestan_id", "tps_code")
                .joinRelated("tps");
        });
    },
};
