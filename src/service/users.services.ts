import { UsersModel } from "../model/users";

interface User {
  email: string;
  name: string;
  phone: string;
  role_id: string;
  password: string;
}

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
        "users.bearer_id",
        "bearers.name as bearer",
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
        "users.tps_code",
        "users.notification_token"
      )
      .joinRelated("[role, bearers]")
      .where("users.is_deleted", false)
      .andWhere("users.id", id)
      .first();
  };

  static save = (data: User) => {
    return UsersModel.query().insert(data);
  };

  static update = (data: UsersModel) => {
    return UsersModel.query().where("id", data.id).update(data);
  };

  static delete = (id: string) => {
    return UsersModel.query().patchAndFetchById(id, {
      is_deleted: true,
      status: 0,
    });
  };

  static getAuditor(bearer_id: number, tps_code: string) {
    return UsersModel.query()
      .select(
        "users.id",
        "users.name",
        "users.bearer_id",
        "users.photo",
        "bearers.codename",
        "role.role"
      )
      .joinRelated("[bearers, role]")
      .where("users.is_deleted", false)
      .andWhere("role_id", "5")
      .andWhere("users.bearer_id", bearer_id)
      .andWhere("users.tps_code", tps_code);
  }

  static getAuditorS(bearer_id: number, tps_code: string) {
    return UsersModel.query()
      .select(
        "users.id",
        "users.name",
        "users.bearer_id",
        "users.photo",
        "bearers.codename",
        "role.role"
      )
      .joinRelated("[bearers, role]")
      .where("users.is_deleted", false)
      .andWhere("role_id", "4")
      .andWhere("users.bearer_id", bearer_id)
      .andWhere("users.tps_code", tps_code);
  }

  static getAuditorWithoutTps(bearer_id: number) {
    return UsersModel.query()
      .select(
        "users.id",
        "users.name",
        "users.bearer_id",
        "users.photo",
        "bearers.codename",
        "role.role"
      )
      .joinRelated("[bearers, role]")
      .where("is_deleted", false)
      .andWhere("role_id", "5")
      .andWhere("bearer_id", bearer_id)
      .andWhere("tps_code", null);
  }

  static getAuditorSWithoutTps(bearer_id: number) {
    return UsersModel.query()
      .select(
        "users.id",
        "users.name",
        "users.bearer_id",
        "users.photo",
        "bearers.codename",
        "role.role"
      )
      .joinRelated("[bearers, role]")
      .where("is_deleted", false)
      .andWhere("role_id", "4")
      .andWhere("bearer_id", bearer_id)
      .andWhere("tps_code", null);
  }

  static getkontestanNotLink(bearer_id: string) {
    return UsersModel.query()
      .select(
        "users.id",
        "users.name",
        "users.bearer_id",
        "users.photo",
        "role.role"
      )
      .leftJoinRelated("kontestan")
      .joinRelated("role")
      .where("users.is_deleted", false)
      .andWhere("users.role_id", "3")
      .andWhere("users.bearer_id", bearer_id)
      .andWhere("kontestan.user_id", null);
  }
}
