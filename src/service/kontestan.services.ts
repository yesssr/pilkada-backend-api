import { KontestanModel } from "../model/kontestan";

export class KontestanService {
  static getAllKontestan = (bearer_id: string) => {
    return KontestanModel.query()
      .select(
        "kontestan.id",
        "kontestan.service_id",
        "kontestan.user_id",
        "users.name as user",
        "users.bearer_id",
        "users:bearers.name as bearer",
        // "kontestan_period.service_name as period",
        // "kontestan.date_start",
        "kontestan.banner",
        "kontestan.title as kontestan",
        "kontestan.slug",
        "kontestan.description",
        "kontestan.status",
        "created.email as created_by",
        "users.photo as url",
        "kontestan.created_at",
        "kontestan.updated_at"
      )
      .joinRelated("[users, created]")
      .joinRelated("users.bearers")
      .where("users.bearer_id", bearer_id)
      .andWhere("users.is_deleted", false);
  };

  static getByKontestanId = (id: string, bearer_id: number) => {
    return KontestanModel.query()
      .select(
        "kontestan.id",
        "kontestan.service_id",
        "kontestan.user_id",
        "users.bearer_id",
        "users:bearers.name as bearer",
        "users.name as kontestan",
        "kontestan_period.service_name as period",
        "kontestan.date_start",
        "kontestan.banner",
        "kontestan.title",
        "kontestan.slug",
        "kontestan.description",
        "kontestan.url",
        "kontestan.status",
        "kontestan.created_by",
        "kontestan.created_at",
        "kontestan.updated_at"
      )
      .joinRelated("[users, kontestan_period]")
      .joinRelated("users.bearers")
      .where("kontestan.id", id)
      .andWhere("users.bearer_id", bearer_id)
      .first();
  };

  static save = (data: KontestanModel) => {
    console.log(data.banner);
    return KontestanModel.query().insert(data);
  };

  static update = (data: KontestanModel) => {
    return KontestanModel.query().where("id", data.id).update(data);
  };

  static delete = (id: string) => {
    return KontestanModel.query().where("kontestan.id", id).delete();
  };

  static getKontestanWithElections = (bearer_id: number) => {
    return KontestanModel.query()
      .select(
        "kontestan.id",
        "kontestan.service_id",
        "kontestan.user_id",
        "users.bearer_id",
        "users:bearers.name as bearer",
        "users.name as kontestan",
        "kontestan_period.service_name as period",
        "kontestan.date_start",
        "kontestan.banner",
        "kontestan.title",
        "kontestan.slug",
        "kontestan.description",
        "kontestan.url",
        "kontestan.status",
        "kontestan.created_by",
        "kontestan.created_at",
        "kontestan.updated_at"
      )
      .joinRelated("[users, kontestan_period]")
      .joinRelated("users.bearers")
      .modify("mod_get_elections")
      .where("users.bearer_id", bearer_id);
  };
}
