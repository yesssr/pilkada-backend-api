"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectionsService = void 0;
const election_summary_1 = require("../model/election_summary");
const election_1 = require("../model/election");
class ElectionsService {
}
exports.ElectionsService = ElectionsService;
_a = ElectionsService;
ElectionsService.getDataElection = (user_id) => {
    return election_1.Elections.query()
        .select("kontestan.id", "kontestan.service_id", "kontestan.bearer_id", "kontestan:bearers.name as bearer", "kontestan_period.service_name as period", "kontestan.date_start", "kontestan.banner", "kontestan.title as kontestan", "kontestan.description", "kontestan.url", "kontestan.status", "kontestan.created_at", "kontestan.updated_at")
        .leftJoinRelated("kontestan")
        .joinRelated("kontestan.bearers");
};
ElectionsService.addElection = (data) => {
    return election_1.Elections.query().insert(data);
};
ElectionsService.countElectionByKontestanId = (kontestan_id, bearer_id) => __awaiter(void 0, void 0, void 0, function* () {
    return election_1.Elections.query()
        .count("elections.id as summary")
        .groupBy("elections.kontestan_id")
        .select("elections.kontestan_id", "kontestan.title as kontestan")
        .joinRelated("[tps, kontestan]")
        .where("tps.is_deleted", false)
        .andWhere("tps.bearer_id", bearer_id)
        .andWhere("elections.kontestan_id", kontestan_id);
});
ElectionsService.detailElectionsByKontestanIdAndTpsCode = (kontestan_id, tps_code, bearer_id, limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
    return election_1.Elections.query()
        .select("elections.id", "elections.kontestan_id", "elections.tps_code", "elections.created_by as auditor_id", "user.name as auditor", "elections.nik", "elections.name", "elections.address", "elections.photo", "elections.created_at", "elections.updated_at")
        .joinRelated("[tps, user]")
        .where("tps.is_deleted", false)
        .andWhere("tps.bearer_id", bearer_id)
        .andWhere("tps.code", tps_code)
        .andWhere("elections.kontestan_id", kontestan_id)
        .orderBy("elections.name")
        .limit(limit)
        .offset(offset);
});
ElectionsService.searchParticipantByName = (kontestan_id, tps_code, bearer_id, name) => __awaiter(void 0, void 0, void 0, function* () {
    return election_1.Elections.query()
        .select("elections.id", "elections.kontestan_id", "elections.tps_code", "elections.created_by as auditor_id", "user.name as auditor", "elections.nik", "elections.name", "elections.address", "elections.photo", "elections.created_at", "elections.updated_at")
        .joinRelated("[tps, user]")
        .where("tps.is_deleted", false)
        .andWhere("tps.bearer_id", bearer_id)
        .andWhere("tps.code", tps_code)
        .andWhere("elections.kontestan_id", kontestan_id)
        .andWhereLike("elections.name", `%${name}%`)
        .orderBy("elections.name")
        .limit(7);
});
/**
 * ========================
 * ELECTION SUMMARY SERVICE
 * ========================
 */
ElectionsService.detailVoteByKontestanIdAndTpsCode = (kontestan_id, tps_code, bearer_id) => __awaiter(void 0, void 0, void 0, function* () {
    return election_summary_1.ElectionSummary.query()
        .count("election_summary.id as summary")
        .groupBy("election_summary.kontestan_id", "election_summary.tps_code", "election_summary.user_id")
        .select("election_summary.id", "election_summary.kontestan_id", "election_summary.tps_code", "election_summary.user_id as auditor_id", "tps.name as tps", "users.name as auditor", "users.photo", "election_summary.created_at", "election_summary.updated_at")
        .joinRelated("[tps, users]")
        .where("tps.is_deleted", false)
        .andWhere("tps.bearer_id", bearer_id)
        .andWhere("users.is_deleted", false)
        .andWhere("election_summary.tps_code", tps_code)
        .andWhere("election_summary.kontestan_id", kontestan_id);
});
ElectionsService.searchAuditorByName = (kontestan_id, tps_code, bearer_id, name) => __awaiter(void 0, void 0, void 0, function* () {
    return election_summary_1.ElectionSummary.query()
        .count("election_summary.id as summary")
        .groupBy("election_summary.kontestan_id", "election_summary.tps_code", "election_summary.user_id")
        .select("election_summary.id", "election_summary.kontestan_id", "election_summary.tps_code", "election_summary.user_id as auditor_id", "tps.name as tps", "users.name as auditor", "users.photo", "election_summary.created_at", "election_summary.updated_at")
        .joinRelated("[tps, users]")
        .where("tps.is_deleted", false)
        .andWhere("tps.bearer_id", bearer_id)
        .andWhere("users.is_deleted", false)
        .andWhere("election_summary.tps_code", tps_code)
        .andWhere("election_summary.kontestan_id", kontestan_id)
        .andWhereILike("users.name", `%${name}%`)
        .orderBy("users.name")
        .limit(7);
});
ElectionsService.getESummaryByKonId = (kontestan_id) => {
    return election_summary_1.ElectionSummary.query()
        .count("election_summary.id as summary")
        .groupBy("election_summary.kontestan_id", "election_summary.tps_code")
        .select("election_summary.user_id as auditor_id", "election_summary.tps_code", "election_summary.kontestan_id", "tps.name as tps", "kontestan.title as kontestan")
        .joinRelated("[kontestan, tps]")
        .where("tps.is_deleted", false)
        .andWhere("election_summary.kontestan_id", kontestan_id)
        .orderBy("tps.name");
};
ElectionsService.getElectionSummaryV2 = (bearer_id) => {
    return election_summary_1.ElectionSummary.query()
        .count("election_summary.id as summary")
        .groupBy("election_summary.kontestan_id")
        .select("election_summary.user_id as auditor_id", "election_summary.kontestan_id", "kontestan.title as kontestan", "kontestan.banner as photo")
        .joinRelated("[kontestan, tps]")
        .joinRelated("kontestan.users")
        .where("tps.is_deleted", false)
        .andWhere("tps.bearer_id", bearer_id)
        .andWhere("kontestan:users.bearer_id", bearer_id)
        .orderBy("summary", "DESC");
};
ElectionsService.getCountElectionSummaryByKonId = (bearer_id, kontestan_id) => {
    return election_summary_1.ElectionSummary.query()
        .count("election_summary.id as summary")
        .groupBy("election_summary.kontestan_id")
        .select("election_summary.user_id as auditor_id", "election_summary.kontestan_id", "kontestan.title as kontestan")
        .joinRelated("[kontestan, tps]")
        .joinRelated("kontestan.users")
        .where("tps.is_deleted", false)
        .andWhere("tps.bearer_id", bearer_id)
        .andWhere("election_summary.kontestan_id", kontestan_id)
        .andWhere("kontestan:users.bearer_id", bearer_id);
};
ElectionsService.saveElectionSummary = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return election_summary_1.ElectionSummary.query().insert(data);
});
