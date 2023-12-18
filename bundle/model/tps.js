"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tps = void 0;
const objection_1 = require("objection");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const status_tps_1 = require("./status_tps");
const basemodel_1 = require("./basemodel");
const districts_1 = require("./districts");
const provinces_1 = require("./provinces");
const regencies_1 = require("./regencies");
const election_1 = require("./election");
const villages_1 = require("./villages");
const users_1 = require("./users");
const bearers_1 = require("./bearers");
const election_summary_1 = require("./election_summary");
class Tps extends basemodel_1.BaseModel {
    $beforeInsert() {
        if (!this.code)
            this.code = (0, utils_1.getUniqueNumber)();
        this.created_at = new Date();
        this.id = (0, uuid_1.v4)();
        this.status = 1;
        this.slug = (0, utils_1.nameToSlug)(this.name);
        this.is_deleted = false;
    }
    $beforeUpdate() {
        this.updated_at = new Date();
        if (this.name)
            this.slug = (0, utils_1.nameToSlug)(this.name);
    }
}
exports.Tps = Tps;
Tps.tableName = "tps";
Tps.jsonSchema = {
    type: "object",
    required: [
        "user_id",
        "name",
        "bearer_id",
        "province_id",
        "regency_id",
        "district_id",
        "village_id",
        "address",
        "latitude",
        "longitude",
    ],
    properties: {
        id: { type: "string" },
        user_id: { type: "string" },
        name: { type: "string" },
        slug: { type: "string" },
        bearer_id: { type: "integer" },
        province_id: { type: "string" },
        regency_id: { type: "string" },
        district_id: { type: "string" },
        village_id: { type: "string" },
        address: { type: "string" },
        desc: { type: "string" },
        latitude: { type: "string" },
        longitude: { type: "string" },
        status: { type: "integer" },
    },
};
Tps.relationMappings = () => ({
    bearers: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: bearers_1.Bearers,
        join: {
            from: "tps.bearer_id",
            to: "bearers.id",
        },
    },
    users: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: users_1.UsersModel,
        join: {
            from: "tps.user_id",
            to: "users.id",
        },
    },
    auditor: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: users_1.UsersModel,
        join: {
            from: "tps.code",
            to: "users.tps_code",
        },
    },
    provinces: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: provinces_1.Provinces,
        join: {
            from: "tps.province_id",
            to: "provinces.id",
        },
    },
    regencies: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: regencies_1.Regencies,
        join: {
            from: "tps.regency_id",
            to: "regencies.id",
        },
    },
    districts: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: districts_1.Districts,
        join: {
            from: "tps.district_id",
            to: "districts.id",
        },
    },
    villages: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: villages_1.Villages,
        join: {
            from: "tps.village_id",
            to: "villages.id",
        },
    },
    status_tps: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: status_tps_1.StatusTps,
        join: {
            from: "tps.status",
            to: "status_tps.code",
        },
    },
    elections: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: election_1.Elections,
        join: {
            from: "tps.code",
            // through: {
            //   from: "elections.tps_code",
            //   to: "elections.kontestan_id",
            // },
            to: "elections.tps_code",
        },
    },
    election_s: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: election_summary_1.ElectionSummary,
        join: {
            from: "tps.code",
            // through: {
            //   from: "elections.tps_code",
            //   to: "elections.kontestan_id",
            // },
            to: "election_summary.tps_code",
        },
    },
});
Tps.modifiers = {
    mod_get_elections(query) {
        query
            .withGraphFetched("elections")
            .modifyGraph("elections", (builder) => {
            builder
                .select("kontestan_id", "kontestan:users.name as kontestan")
                .count("elections.id", { as: "summary" })
                .from("elections")
                .groupBy("kontestan_id", "tps_code")
                .joinRelated("kontestan")
                .joinRelated("kontestan.users");
        });
    },
    mod_get_auditor(query, bearer_id) {
        query.withGraphFetched("auditor").modifyGraph("auditor", (builder) => {
            builder
                .select("users.id", "users.name", "users.bearer_id", "bearers.codename")
                .from("users")
                .joinRelated("bearers")
                .where("users.is_deleted", false)
                .andWhere("users.bearer_id", bearer_id);
        });
    },
};
