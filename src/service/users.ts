import { UsersModel } from "../model/users";

export class UsersService {
  static getAllUsers = () => {
    return UsersModel.query()
      .select(
        "users.id",
        "users.name",
        "users.email",
        "users.phone",
        "users.email_verified_at",
        "users.remember_token",
        "users.photo",
        "users.role_id",
        "role.role",
        "users.status",
        "users.notification_token"
      )
      .joinRelated("role")
      .where("users.is_deleted", false);
  };

  static getByIdUser = (id: string) => {
    return UsersModel.query()
      .select(
        "users.id",
        "users.name",
        "users.email",
        "users.phone",
        "users.email_verified_at",
        "users.remember_token",
        "users.photo",
        "users.role_id",
        "role.role",
        "users.status",
        "users.notification_token"
      )
      .joinRelated("role")
      .where("users.is_deleted", false)
      .andWhere("users.id", id);
  };

  static save = async (data: UsersModel) => {
    return UsersModel.query()
      .insert(data);
  };

  static update = async (data: UsersModel) => {
    return UsersModel.query()
      .update(data)
      .where("users.id", data.id)
      .returning("*");
  };

  static delete = async (id: string) => {
    return UsersModel.query()
      .patchAndFetchById(id, {
        is_deleted: true,
      });
  };
}
