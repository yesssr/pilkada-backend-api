import { Tps } from "../model/tps";

export class TpsService {
  static getAllTps = (bearer_id: number) => {
    return Tps.query()
      .select(
        "tps.id",
        "tps.user_id",
        "tps.code",
        "tps.bearer_id",
        "bearers.name as bearer",
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
      .joinRelated(
        "[users, provinces, regencies, districts, villages, status_tps, bearers]"
      )
      .where("tps.is_deleted", false)
      .andWhere("tps.bearer_id", bearer_id);
  };

  static getTpsWithElections = (bearer_id: number) => {
    return Tps.query()
      .select(
        "tps.id",
        "tps.user_id",
        "tps.code",
        "tps.bearer_id",
        "bearers.name as bearer",
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
      .joinRelated(
        "[users, provinces, regencies, districts, villages, status_tps, bearers]"
      )
      .modify("mod_get_elections")
      .where("tps.is_deleted", false)
      .andWhere("tps.bearer_id", bearer_id);
  };

  static getByTpsId = (id: string, bearer_id: number) => {
    return Tps.query()
      .select(
        "tps.id",
        "tps.user_id",
        "tps.bearer_id",
        "bearers.name as bearer",
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
      .joinRelated(
        "[users, provinces, regencies, districts, villages, status_tps, bearers]"
      )
      .where("tps.is_deleted", false)
      .andWhere("tps.id", id)
      .andWhere("tps.bearer_id", bearer_id)
      .first();
  };

  static save = (data: Tps) => {
    return Tps.query()
      .insert(data);
  };

  static update = (data: Tps) => {
    return Tps.query()
    .where("tps.id", data.id)
    .update(data);
  };

  static deleteById = (id: string) => {
    return Tps.query()
      .patchAndFetchById(id, {
        is_deleted: true,
        status: 0,
      });
  };
}
