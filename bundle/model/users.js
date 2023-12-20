"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const objection_1 = require("objection");
const uuid_1 = require("uuid");
const error_1 = require("../middleware/error");
const status_user_1 = require("./status_user");
const user_tokens_1 = require("./user_tokens");
const utils_1 = require("../utils/utils");
const basemodel_1 = require("./basemodel");
const bearers_1 = require("./bearers");
const roles_1 = require("./roles");
const kontestan_1 = require("./kontestan");
class UsersModel extends basemodel_1.BaseModel {
    $beforeInsert() {
        return __awaiter(this, void 0, void 0, function* () {
            this.created_at = new Date();
            this.id = (0, uuid_1.v4)();
            this.status = 1;
            this.password = (0, utils_1.hashPass)(this.password);
            let check = yield UsersModel.query()
                .select("email")
                .where("email", this.email)
                .first();
            if (check) {
                let err = new error_1.SendError();
                err.message = "email already registered !";
                err.statusCode = 400;
                throw err;
            }
        });
    }
    $beforeUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            this.updated_at = new Date();
            if (this.password) {
                this.password = (0, utils_1.hashPass)(this.password);
            }
            if (this.email) {
                let check = yield UsersModel.query()
                    .select("id", "email")
                    .where("email", this.email)
                    .first();
                if (check && check.email !== this.email) {
                    let err = new error_1.SendError();
                    err.message = "email already registered !";
                    err.statusCode = 400;
                    throw err;
                }
            }
        });
    }
}
exports.UsersModel = UsersModel;
UsersModel.tableName = "users";
UsersModel.jsonSchema = {
    type: "object",
    required: ["name", "email", "phone", "password", "role_id", "bearer_id"],
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        email_verified_at: { type: "string" },
        password: { type: "string", minLength: 8 },
        remember_token: { type: "string" },
        photo: { type: "string" },
        role_id: { type: "string" },
        is_deleted: { type: "boolean" },
        status: { type: "boolean" },
        notification_token: { type: "string" },
    },
};
UsersModel.relationMappings = () => ({
    kontestan: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: kontestan_1.KontestanModel,
        join: {
            from: "users.id",
            to: "kontestan.user_id",
        },
    },
    bearers: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: bearers_1.Bearers,
        join: {
            from: "users.bearer_id",
            to: "bearers.id",
        },
    },
    role: {
        relation: objection_1.Model.HasOneRelation,
        modelClass: roles_1.RoleModel,
        join: {
            from: "users.role_id",
            to: "role.id",
        },
    },
    status_user: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: status_user_1.StatusUser,
        join: {
            from: "users.status",
            to: "status_user.code",
        },
    },
    user_token: {
        relation: objection_1.Model.HasOneRelation,
        modelClass: user_tokens_1.UserTokens,
        join: {
            from: "users.id",
            to: "user_tokens.user_id",
        },
    },
});
