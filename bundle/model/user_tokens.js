"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTokens = void 0;
const objection_1 = require("objection");
const basemodel_1 = require("./basemodel");
const users_1 = require("./users");
class UserTokens extends basemodel_1.BaseModel {
}
exports.UserTokens = UserTokens;
UserTokens.tableName = "user_tokens";
UserTokens.jsonSchema = {
    type: "object",
    required: ["status"],
    properties: {
        id: { type: "integer" },
        user_id: { type: "string" },
        token: { type: "string" },
        role_id: { type: "string" },
    },
};
UserTokens.relationMappings = () => ({
    user: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: users_1.UsersModel,
        join: {
            from: "user_tokens.user_id",
            to: "users.id",
        },
    },
});
