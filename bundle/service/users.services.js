"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const users_1 = require("../model/users");
class UsersService {
    static getkontestanNotLink(bearer_id) {
        return users_1.UsersModel.query()
            .select("users.id", "users.name", "users.bearer_id", "users.photo", "role.role")
            .leftJoinRelated("kontestan")
            .joinRelated("role")
            .where("users.is_deleted", false)
            .andWhere("users.role_id", "3")
            .andWhere("users.bearer_id", bearer_id)
            .andWhere("kontestan.user_id", null);
    }
}
exports.UsersService = UsersService;
UsersService.getAllUsers = () => {
    return users_1.UsersModel.query()
        .select("users.id", "users.name", "users.email", "users.phone", "users.email_verified_at", "users.remember_token", "users.photo", "users.role_id", "role.role", "users.status", "status_user.en as status_user", "users.notification_token", "users.created_at", "users.updated_at")
        .joinRelated("[role, status_user]")
        .where("users.is_deleted", false);
};
UsersService.getByIdUser = (id) => {
    return users_1.UsersModel.query()
        .select("users.id", "users.bearer_id", "bearers.name as bearer", "users.name", "users.email", "users.phone", "users.password", "users.email_verified_at", "users.remember_token", "users.photo", "users.role_id", "role.role", "role.slug", "users.status", "users.tps_code", "users.notification_token")
        .joinRelated("[role, bearers]")
        .where("users.is_deleted", false)
        .andWhere("users.id", id)
        .first();
};
UsersService.save = (data) => {
    return users_1.UsersModel.query().insert(data);
};
UsersService.update = (data) => {
    return users_1.UsersModel.query().where("id", data.id).update(data);
};
UsersService.delete = (id) => {
    return users_1.UsersModel.query().patchAndFetchById(id, {
        is_deleted: true,
        status: 0,
    });
};
