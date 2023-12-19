import { ElectionSummary } from "../model/election_summary";
import { Elections } from "../model/election";

export class ElectionsService {
  static getDataElection = (user_id: string) => {
    return Elections.query()
      .select(
        "kontestan.id",
        "kontestan.service_id",
        "kontestan.bearer_id",
        "kontestan:bearers.name as bearer",
        "kontestan_period.service_name as period",
        "kontestan.date_start",
        "kontestan.banner",
        "kontestan.title as kontestan",
        "kontestan.description",
        "kontestan.url",
        "kontestan.status",
        "kontestan.created_at",
        "kontestan.updated_at"
      )
      .leftJoinRelated("kontestan")
      .joinRelated("kontestan.bearers");
  };

  static addElection = (data: Elections) => {
    return Elections.query().insert(data);
  };

  static countElectionByKontestanId = async (
    kontestan_id: string,
    bearer_id: number
  ) => {
    return Elections.query()
      .count("elections.id as summary")
      .groupBy("elections.kontestan_id")
      .select("elections.kontestan_id", "kontestan.title as kontestan")
      .joinRelated("[tps, kontestan]")
      .where("tps.is_deleted", false)
      .andWhere("tps.bearer_id", bearer_id)
      .andWhere("elections.kontestan_id", kontestan_id);
  };

  static detailElectionsByKontestanIdAndTpsCode = async (
    kontestan_id: string,
    tps_code: string,
    bearer_id: number,
    limit: number,
    offset: number
  ) => {
    return Elections.query()
      .select(
        "elections.id",
        "elections.kontestan_id",
        "elections.tps_code",
        "elections.created_by as auditor_id",
        "user.name as auditor",
        "elections.nik",
        "elections.name",
        "elections.address",
        "elections.photo",
        "elections.created_at",
        "elections.updated_at"
      )
      .joinRelated("[tps, user]")
      .where("tps.is_deleted", false)
      .andWhere("tps.bearer_id", bearer_id)
      .andWhere("tps.code", tps_code)
      .andWhere("elections.kontestan_id", kontestan_id)
      .orderBy("elections.name")
      .limit(limit)
      .offset(offset);
  };

  static searchParticipantByName = async (
    kontestan_id: string,
    tps_code: string,
    bearer_id: number,
    name?: string
  ) => {
    return Elections.query()
      .select(
        "elections.id",
        "elections.kontestan_id",
        "elections.tps_code",
        "elections.created_by as auditor_id",
        "user.name as auditor",
        "elections.nik",
        "elections.name",
        "elections.address",
        "elections.photo",
        "elections.created_at",
        "elections.updated_at"
      )
      .joinRelated("[tps, user]")
      .where("tps.is_deleted", false)
      .andWhere("tps.bearer_id", bearer_id)
      .andWhere("tps.code", tps_code)
      .andWhere("elections.kontestan_id", kontestan_id)
      .andWhereLike("elections.name", `%${name}%`)
      .orderBy("elections.name")
      .limit(7);
  };

  /**
   * ========================
   * ELECTION SUMMARY SERVICE
   * ========================
   */

  static detailVoteByKontestanIdAndTpsCode = async (
    kontestan_id: string,
    tps_code: string,
    bearer_id: number
  ) => {
    return ElectionSummary.query()
      .count("election_summary.id as summary")
      .groupBy(
        "election_summary.kontestan_id",
        "election_summary.tps_code",
        "election_summary.user_id"
      )
      .select(
        "election_summary.id",
        "election_summary.kontestan_id",
        "election_summary.tps_code",
        "election_summary.user_id as auditor_id",
        "tps.name as tps",
        "users.name as auditor",
        "users.photo",
        "election_summary.created_at",
        "election_summary.updated_at"
      )
      .joinRelated("[tps, users]")
      .where("tps.is_deleted", false)
      .andWhere("tps.bearer_id", bearer_id)
      .andWhere("users.is_deleted", false)
      .andWhere("election_summary.tps_code", tps_code)
      .andWhere("election_summary.kontestan_id", kontestan_id);
  };

  static searchAuditorByName = async (
    kontestan_id: string,
    tps_code: string,
    bearer_id: number,
    name?: string
  ) => {
    return ElectionSummary.query()
      .count("election_summary.id as summary")
      .groupBy(
        "election_summary.kontestan_id",
        "election_summary.tps_code",
        "election_summary.user_id"
      )
      .select(
        "election_summary.id",
        "election_summary.kontestan_id",
        "election_summary.tps_code",
        "election_summary.user_id as auditor_id",
        "tps.name as tps",
        "users.name as auditor",
        "users.photo",
        "election_summary.created_at",
        "election_summary.updated_at"
      )
      .joinRelated("[tps, users]")
      .where("tps.is_deleted", false)
      .andWhere("tps.bearer_id", bearer_id)
      .andWhere("users.is_deleted", false)
      .andWhere("election_summary.tps_code", tps_code)
      .andWhere("election_summary.kontestan_id", kontestan_id)
      .andWhereILike("users.name", `%${name}%`)
      .orderBy("users.name")
      .limit(7);
  };

  static getESummaryByKonId = (kontestan_id: string) => {
    return ElectionSummary.query()
      .count("election_summary.id as summary")
      .groupBy("election_summary.kontestan_id", "election_summary.tps_code")
      .select(
        "election_summary.user_id as auditor_id",
        "election_summary.tps_code",
        "election_summary.kontestan_id",
        "tps.name as tps",
        "kontestan.title as kontestan"
      )
      .joinRelated("[kontestan, tps]")
      .where("tps.is_deleted", false)
      .andWhere("election_summary.kontestan_id", kontestan_id)
      .orderBy("tps.name");
  };

  static getElectionSummaryV2 = (bearer_id: number) => {
    return ElectionSummary.query()
      .count("election_summary.id as summary")
      .groupBy("election_summary.kontestan_id")
      .select(
        "election_summary.user_id as auditor_id",
        "election_summary.kontestan_id",
        "kontestan.title as kontestan",
        "kontestan.banner as photo"
      )
      .joinRelated("[kontestan, tps]")
      .joinRelated("kontestan.users")
      .where("tps.is_deleted", false)
      .andWhere("tps.bearer_id", bearer_id)
      .andWhere("kontestan:users.bearer_id", bearer_id)
      .orderBy("summary", "DESC");
  };

  static getCountElectionSummaryByKonId = (
    bearer_id: number,
    kontestan_id: string
  ) => {
    return ElectionSummary.query()
      .count("election_summary.id as summary")
      .groupBy("election_summary.kontestan_id")
      .select(
        "election_summary.user_id as auditor_id",
        "election_summary.kontestan_id",
        "kontestan.title as kontestan",
        "tps.name as tps"
      )
      .joinRelated("[kontestan, tps]")
      .joinRelated("kontestan.users")
      .where("tps.is_deleted", false)
      .andWhere("tps.bearer_id", bearer_id)
      .andWhere("election_summary.kontestan_id", kontestan_id)
      .andWhere("kontestan:users.bearer_id", bearer_id);
  };
  static getCountElectionSummaryByKonIdGroupByTps = (
    bearer_id: number,
    kontestan_id: string
  ) => {
    return ElectionSummary.query()
      .count("election_summary.id as summary")
      .groupBy("election_summary.kontestan_id", "election_summary.tps_code")
      .select(
        "election_summary.user_id as auditor_id",
        "election_summary.kontestan_id",
        "kontestan.title as kontestan",
        "tps.name as tps"
      )
      .joinRelated("[kontestan, tps]")
      .joinRelated("kontestan.users")
      .where("tps.is_deleted", false)
      .andWhere("tps.bearer_id", bearer_id)
      .andWhere("election_summary.kontestan_id", kontestan_id)
      .andWhere("kontestan:users.bearer_id", bearer_id);
  };

  static saveElectionSummary = async (data: ElectionSummary) => {
    return ElectionSummary.query().insert(data);
  };
}
