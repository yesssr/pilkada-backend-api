import { UsersModel } from "../model/users";

export class AuthService {
  static getByUsersCredentials = (email: string) => {
    return UsersModel.query()
      .select(
        "users.id",
        "users.name",
        "users.email",
        "users.phone",
        "users.password",
        "users.email_verified_at",
        "users.remember_token",
        "users.photo",
        "users.role_id",
        "role.role",
        "role.slug",
        "users.status",
        "users.notification_token"
      )
      .joinRelated("role")
      .where("users.is_deleted", false)
      .andWhere("users.email", email)
      .first();
  };
}
