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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTokenService = void 0;
const user_tokens_1 = require("../model/user_tokens");
const utils_1 = require("../utils/utils");
class UserTokenService {
}
exports.UserTokenService = UserTokenService;
_a = UserTokenService;
UserTokenService.getAllToken = (status) => __awaiter(void 0, void 0, void 0, function* () {
    let query = user_tokens_1.UserTokens.query()
        .select("user_tokens.id", "user_tokens.user_id", "user.name as user", "user_tokens.token", "user_tokens.status", "user_tokens.created_at", "user_tokens.updated_at")
        .leftJoinRelated("user");
    if (status)
        query.where("user_tokens.status", status);
    return yield query;
});
UserTokenService.getByTokenId = (id) => {
    return user_tokens_1.UserTokens.query()
        .select("user_tokens.id", "user_tokens.user_id", "user.name as user", "user_tokens.token", "user_tokens.status", "user_tokens.created_at", "user_tokens.updated_at")
        .leftJoinRelated("user")
        .where("user_tokens.id", id);
};
UserTokenService.generateToken = (total) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    for (let i = 0; i < total; i++) {
        let query = yield user_tokens_1.UserTokens.query().insert({
            token: (0, utils_1.getUniqueNumber)(),
            status: "available",
        });
        result.push(query);
    }
    return result;
});
UserTokenService.deleteById = (id) => {
    return user_tokens_1.UserTokens.query().where("id", id).delete();
};
UserTokenService.checkStatusToken = (token) => {
    return user_tokens_1.UserTokens.query()
        .select("status", "role_id")
        .where("token", token)
        .first();
};
UserTokenService.addUserIdToToken = (user_id, token) => {
    return user_tokens_1.UserTokens.query()
        .update({ user_id: user_id, status: "used" })
        .where("token", token);
};
