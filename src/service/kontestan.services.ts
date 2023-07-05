import { KontestanModel } from "../model/kontestan";

export class KontestanService {
  static getAllKontestan = () => {
    return KontestanModel.query()
      .select(
        "kontestan.id",
        "kontestan.service_id",
        "kontestan.user_id",
        "users.name as kontestan_name",
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
      .joinRelated("[users, kontestan_period, status_kontestan]");
  };

  static getByKontestanId = (id: string) => {
    return KontestanModel.query()
      .select(
        "kontestan.id",
        "kontestan.service_id",
        "kontestan.user_id",
        "users.name as kontestan_name",
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
      .joinRelated("[users, kontestan_period, status_kontestan]")
      .where("kontestan.id", id)
      .first();
  };

  static save = (data: KontestanModel) => {
    return KontestanModel.query()
      .insert(data);
  };

  static update = (data: KontestanModel) => {
    return KontestanModel.query()
      .patchAndFetchById(data.id, data);
  };

  static delete = (id: string) => {
    return KontestanModel.query()
      .where("kontestan.id", id)
      .delete()
      .returning("*");
  };
}
