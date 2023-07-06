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
        "status_user.en as status_user",
        "users.notification_token",
        "users.created_at",
        "users.updated_at"
      )
      .joinRelated("[role, status_user]")
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
        "status_user.en as status_user",
        "users.notification_token",
        "users.created_at",
        "users.updated_at"
      )
      .joinRelated("[role, status_user]")
      .where("users.is_deleted", false)
      .andWhere("users.id", id)
      .first();
  };

  static save = (data: UsersModel) => {
    return UsersModel.query()
      .insert(data);
  };

  static update = (data: UsersModel) => {
    return UsersModel.query()
      .where("id", data.id)
      .update(data);
  };

  static delete = (id: string) => {
    return UsersModel.query()
      .patchAndFetchById(id, {
        is_deleted: true,
        status: 0,
      });
  };
}
