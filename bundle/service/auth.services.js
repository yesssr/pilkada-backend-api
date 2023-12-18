"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const users_1 = require("../model/users");
class AuthService {
}
exports.AuthService = AuthService;
AuthService.getByUsersCredentials = (email) => {
    return users_1.UsersModel.query()
        .select("users.id", "users.bearer_id", "bearers.name as bearer", "users.name", "users.email", "users.phone", "users.password", "users.email_verified_at", "users.remember_token", "users.photo", "users.role_id", "role.role", "role.slug", "users.status", "users.notification_token")
        .joinRelated("[role, bearers]")
        .where("users.is_deleted", false)
        .andWhere("users.email", email)
        .first();
};
