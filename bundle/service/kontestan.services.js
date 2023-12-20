"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KontestanService = void 0;
const kontestan_1 = require("../model/kontestan");
class KontestanService {
}
exports.KontestanService = KontestanService;
KontestanService.getAllKontestan = (bearer_id) => {
    return kontestan_1.KontestanModel.query()
        .select("kontestan.id", "kontestan.service_id", "kontestan.user_id", "users.name as user", "users.bearer_id", "users:bearers.name as bearer", 
    // "kontestan_period.service_name as period",
    // "kontestan.date_start",
    "kontestan.banner", "kontestan.title as kontestan", "kontestan.slug", "kontestan.description", "kontestan.status", "created.email as created_by", "users.photo as url", "kontestan.created_at", "kontestan.updated_at")
        .joinRelated("[users, created]")
        .joinRelated("users.bearers")
        .where("users.bearer_id", bearer_id)
        .andWhere("users.is_deleted", false);
};
KontestanService.getByKontestanId = (id, bearer_id) => {
    return kontestan_1.KontestanModel.query()
        .select("kontestan.id", "kontestan.service_id", "kontestan.user_id", "users.bearer_id", "users:bearers.name as bearer", "users.name as kontestan", "kontestan_period.service_name as period", "kontestan.date_start", "kontestan.banner", "kontestan.title", "kontestan.slug", "kontestan.description", "kontestan.url", "kontestan.status", "kontestan.created_by", "kontestan.created_at", "kontestan.updated_at")
        .joinRelated("[users, kontestan_period]")
        .joinRelated("users.bearers")
        .where("kontestan.id", id)
        .andWhere("users.bearer_id", bearer_id)
        .first();
};
KontestanService.save = (data) => {
    console.log(data.banner);
    return kontestan_1.KontestanModel.query().insert(data);
};
KontestanService.update = (data) => {
    return kontestan_1.KontestanModel.query().where("id", data.id).update(data);
};
KontestanService.delete = (id) => {
    return kontestan_1.KontestanModel.query().where("kontestan.id", id).delete();
};
KontestanService.getKontestanWithElections = (bearer_id) => {
    return kontestan_1.KontestanModel.query()
        .select("kontestan.id", "kontestan.service_id", "kontestan.user_id", "users.bearer_id", "users:bearers.name as bearer", "users.name as kontestan", "kontestan_period.service_name as period", "kontestan.date_start", "kontestan.banner", "kontestan.title", "kontestan.slug", "kontestan.description", "kontestan.url", "kontestan.status", "kontestan.created_by", "kontestan.created_at", "kontestan.updated_at")
        .joinRelated("[users, kontestan_period]")
        .joinRelated("users.bearers")
        .modify("mod_get_elections")
        .where("users.bearer_id", bearer_id);
};
