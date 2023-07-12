import { KontestanModel } from "../model/kontestan";

export class KontestanService {
  static getAllKontestan = (bearer_id: number) => {
    return KontestanModel.query()
      .select(
        "kontestan.id",
        "kontestan.service_id",
        "kontestan.user_id",
        "kontestan.bearer_id",
        "bearers.name as bearer",
        "users.name as kontestan",
        "kontestan_period.service_name as period",
        "kontestan.date_start",
        "kontestan.banner",
        "kontestan.title",
        "kontestan.slug",
        "kontestan.description",
        "kontestan.url",
        "status_kontestan.en as status",
        "kontestan.created_by",
        "kontestan.created_at",
        "kontestan.updated_at"
      )
      .joinRelated("[users, kontestan_period, status_kontestan, bearers]")
      .where("kontestan.bearer_id", bearer_id);
  };

  static getByKontestanId = (id: string, bearer_id: number) => {
    return KontestanModel.query()
      .select(
        "kontestan.id",
        "kontestan.service_id",
        "kontestan.user_id",
        "kontestan.bearer_id",
        "bearers.name as bearer",
        "users.name as kontestan",
        "kontestan_period.service_name as period",
        "kontestan.date_start",
        "kontestan.banner",
        "kontestan.title",
        "kontestan.slug",
        "kontestan.description",
        "kontestan.url",
        "status_kontestan.en as status",
        "kontestan.created_by",
        "kontestan.created_at",
        "kontestan.updated_at"
      )
      .joinRelated("[users, kontestan_period, status_kontestan, bearers]")
      .where("kontestan.id", id)
      .andWhere("kontestan.bearer_id", bearer_id)
      .first();
  };

  static save = (data: KontestanModel) => {
    return KontestanModel.query()
      .insert(data);
  };

  static update = (data: KontestanModel) => {
    return KontestanModel.query()
      .where("id", data.id)
      .update(data);
  };

  static delete = (id: string) => {
    return KontestanModel.query()
      .where("kontestan.id", id)
      .delete();
  };

  static getKontestanWithElections = (bearer_id: number) => {
    return KontestanModel.query()
      .select(
        "kontestan.id",
        "kontestan.service_id",
        "kontestan.user_id",
        "kontestan.bearer_id",
        "bearers.name as bearer",
        "users.name as kontestan",
        "kontestan_period.service_name as period",
        "kontestan.date_start",
        "kontestan.banner",
        "kontestan.title",
        "kontestan.slug",
        "kontestan.description",
        "kontestan.url",
        "status_kontestan.en as status",
        "kontestan.created_by",
        "kontestan.created_at",
        "kontestan.updated_at"
      )
      .joinRelated("[users, kontestan_period, status_kontestan, bearers]")
      .modify("mod_get_elections")
      .where("kontestan.bearer_id", bearer_id);
  }
}
