import { RoleModel } from "../model/roles";

export class RoleService {
  //get all data role
  static getAllRoles = () => {
    return RoleModel.query()
      .select(
        "role.id",
        "role.role",
        "role.created_at",
        "role.updated_at"
      );
  };

  //get data role by id
  static getByRoleId = (id: string) => {
    return RoleModel.query()
      .select(
        "role.id",
        "role.role",
        "role.created_at",
        "role.updated_at"
      )
      .where("role.id", id)
      .first();
  };

  //create role
  static save = (data: RoleModel) => {
    return RoleModel.query()
      .insert(data);
  };

  //update role
  static update = (data: RoleModel) => {
    return RoleModel.query()
      .where("id", data.id)
      .update(data);
  };

  //delete role
  static deleteById = (id: string) => {
    return RoleModel.query()
      .where("id", id)
      .delete();
  };
};