import { Tps } from "../model/tps";

export class TpsService {
  static getAllTps = (bearer_id: number, limit: number, offset: number) => {
    return Tps.query()
      .select(
        "tps.id",
        "tps.user_id",
        "tps.code",
        "tps.bearer_id",
        "tps.province_id",
        "tps.regency_id",
        "tps.district_id",
        "tps.village_id",
        "tps.status",
        "tps.slug",
        "tps.name as tps",
        "users.name as createdBy",
        "provinces.name as province",
        "regencies.name as regency",
        "districts.name as district",
        "villages.name as village",
        "tps.address",
        "tps.desc",
        "tps.latitude",
        "tps.longitude",
        "tps.created_at",
        "tps.updated_at"
      )
      .joinRelated("[users, provinces, regencies, districts, villages,]")
      .where("tps.is_deleted", false)
      .andWhere("tps.bearer_id", bearer_id)
      .andWhere("users.bearer_id", bearer_id)
      .limit(limit)
      .offset(offset);
  };

  static searchTpsByName = (bearer_id: number, name?: string) => {
    return Tps.query()
      .select(
        "tps.id",
        "tps.user_id",
        "tps.code",
        "tps.bearer_id",
        "tps.province_id",
        "tps.regency_id",
        "tps.district_id",
        "tps.village_id",
        "tps.status",
        "tps.slug",
        "tps.name as tps",
        "users.name as createdBy",
        "provinces.name as province",
        "regencies.name as regency",
        "districts.name as district",
        "villages.name as village",
        "tps.address",
        "tps.desc",
        "tps.latitude",
        "tps.longitude",
        "tps.created_at",
        "tps.updated_at"
      )
      .joinRelated("[users, provinces, regencies, districts, villages,]")
      .where("tps.is_deleted", false)
      .andWhere("users.bearer_id", bearer_id)
      .andWhere("tps.bearer_id", bearer_id)
      .andWhereLike("tps.name", `%${name}%`)
      .orWhereILike("tps.code", `%${name}%`)
      .andWhere("tps.is_deleted", false)
      .andWhere("users.bearer_id", bearer_id)
      .andWhere("tps.bearer_id", bearer_id)
      .limit(7);
  };

  static save = (data: Tps) => {
    return Tps.query().insert(data);
  };

  static update = (data: Tps) => {
    return Tps.query()
      .where("tps.id", data.id)
      .andWhere("tps.bearer_id", data.bearer_id)
      .update(data);
  };

  static deleteById = (id: string) => {
    return Tps.query().patchAndFetchById(id, {
      is_deleted: true,
      status: 0,
    });
  };
}
