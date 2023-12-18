"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const roles_1 = require("../model/roles");
class RoleService {
}
exports.RoleService = RoleService;
//get all data role
RoleService.getAllRoles = () => {
    return roles_1.RoleModel.query()
        .select("role.id", "role.role", "role.created_at", "role.updated_at");
};
//get data role by id
RoleService.getByRoleId = (id) => {
    return roles_1.RoleModel.query()
        .select("role.id", "role.role", "role.created_at", "role.updated_at")
        .where("role.id", id)
        .first();
};
//create role
RoleService.save = (data) => {
    return roles_1.RoleModel.query()
        .insert(data);
};
//update role
RoleService.update = (data) => {
    return roles_1.RoleModel.query()
        .where("id", data.id)
        .update(data);
};
//delete role
RoleService.deleteById = (id) => {
    return roles_1.RoleModel.query()
        .where("id", id)
        .delete();
};
;
