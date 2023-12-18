"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TpsService = void 0;
const tps_1 = require("../model/tps");
class TpsService {
}
exports.TpsService = TpsService;
TpsService.getAllTps = (bearer_id, limit, offset) => {
    return tps_1.Tps.query()
        .select("tps.id", "tps.user_id", "tps.code", "tps.bearer_id", "tps.province_id", "tps.regency_id", "tps.district_id", "tps.village_id", "tps.status", "tps.slug", "tps.name as tps", "users.name as createdBy", "provinces.name as province", "regencies.name as regency", "districts.name as district", "villages.name as village", "tps.address", "tps.desc", "tps.latitude", "tps.longitude", "tps.created_at", "tps.updated_at")
        .joinRelated("[users, provinces, regencies, districts, villages,]")
        .where("tps.is_deleted", false)
        .andWhere("tps.bearer_id", bearer_id)
        .andWhere("users.bearer_id", bearer_id)
        .limit(limit)
        .offset(offset);
};
TpsService.searchTpsByName = (bearer_id, name) => {
    return tps_1.Tps.query()
        .select("tps.id", "tps.user_id", "tps.code", "tps.bearer_id", "tps.province_id", "tps.regency_id", "tps.district_id", "tps.village_id", "tps.status", "tps.slug", "tps.name as tps", "users.name as createdBy", "provinces.name as province", "regencies.name as regency", "districts.name as district", "villages.name as village", "tps.address", "tps.desc", "tps.latitude", "tps.longitude", "tps.created_at", "tps.updated_at")
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
TpsService.save = (data) => {
    return tps_1.Tps.query().insert(data);
};
TpsService.update = (data) => {
    return tps_1.Tps.query()
        .where("tps.id", data.id)
        .andWhere("tps.bearer_id", data.bearer_id)
        .update(data);
};
TpsService.deleteById = (id) => {
    return tps_1.Tps.query().patchAndFetchById(id, {
        is_deleted: true,
        status: 0,
    });
};
