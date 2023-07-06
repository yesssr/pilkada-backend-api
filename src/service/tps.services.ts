import { Tps } from "../model/tps";

export class TpsService {
  static getAllTps = async () => {
    return Tps.query()
      .select(
        "tps.id",
        "tps.user_id",
        "tps.code",
        "tps.province_id",
        "tps.regency_id",
        "tps.district_id",
        "tps.village_id",
        "tps.status",
        "tps.slug",
        "tps.name as tps",
        "users.name as auditor",
        "provinces.name as province",
        "regencies.name as regency",
        "districts.name as district",
        "villages.name as village",
        "tps.address",
        "tps.desc",
        "tps.latitude",
        "tps.longitude",
        "status_tps.en as status_tps",
        "tps.created_at",
        "tps.updated_at"
      )
      .joinRelated("[users, provinces, regencies, districts, villages, status_tps]")
      .where("tps.is_deleted", false);
  };

  static getByTpsId = async (id: string) => {
    return Tps.query()
      .select(
        "tps.id",
        "tps.user_id",
        "tps.slug",
        "tps.province_id",
        "tps.regency_id",
        "tps.district_id",
        "tps.village_id",
        "tps.status",
        "tps.name as tps",
        "users.name as auditor",
        "provinces.name as province",
        "regencies.name as regency",
        "districts.name as district",
        "villages.name as village",
        "tps.address",
        "tps.desc",
        "tps.latitude",
        "tps.longitude",
        "status_tps.en as status_tps",
        "tps.created_at",
        "tps.updated_at"
      )
      .joinRelated("[users, provinces, regencies, districts, villages, status_tps]")
      .where("tps.is_deleted", false)
      .andWhere("tps.id", id)
      .first();
  };

  static save = async (data: Tps) => {
    return Tps.query()
      .insert(data);
  };

  static update = async (data: Tps) => {
    return Tps.query()
    .where("tps.id", data.id)
    .update(data);
  };

  static deleteById = async (id: string) => {
    return Tps.query()
      .patchAndFetchById(id, {
        is_deleted: true,
      });
  };
}
