import { ElectionSummary } from "../model/election_summary";
import { Elections } from "../model/election";

export interface ElectionsImport {
  poin: number;
  type: string;
  kontestan_id: string;
  user_id: string;
  created_by: string;
}

export class ElectionsService {
  static addElection = (data: Elections) => {
    return Elections.query().insert(data);
  };

  static countElectionByKontestanId = async (kontestan_id: string, bearer_id: number) => {
    return Elections.query()
      .select(
        "kontestan_id",
        "tps_code",
        "kontestan:users.name as kontestan",
        "tps.name as tps"
      )
      .count("elections.id", { as: "summary" })
      .from("elections")
      .where("kontestan_id", kontestan_id)
      .andWhere("kontestan.bearer_id", bearer_id)
      .andWhere("tps.bearer_id", bearer_id)
      .groupBy("kontestan_id", "tps_code")
      .joinRelated("[kontestan, tps]")
      .joinRelated("kontestan.users");
  };

  static countElectionByTpsCode = async (tps_code: string, bearer_id: number) => {
    return Elections.query()
      .select(
        "kontestan_id",
        "tps_code",
        "kontestan:users.name as kontestan",
        "tps.name as tps"
      )
      .count("elections.id", { as: "summary" })
      .from("elections")
      .where("tps_code", tps_code)
      .groupBy("kontestan_id", "tps_code")
      .andWhere("kontestan.bearer_id", bearer_id)
      .andWhere("tps.bearer_id", bearer_id)
      .joinRelated("[kontestan, tps]")
      .joinRelated("kontestan.users");
  };

  static countElectionByKontestanIdAndTpsCode = async (
    kontestan_id: string,
    tps_code: string,
    bearer_id: number
  ) => {
    return Elections.query()
      .select(
        "kontestan_id",
        "tps_code",
        "kontestan:users.name as kontestan",
        "tps.name as tps"
      )
      .count("elections.id", { as: "summary" })
      .from("elections")
      .where("kontestan_id", kontestan_id)
      .andWhere("kontestan.bearer_id", bearer_id)
      .andWhere("tps.bearer_id", bearer_id)
      .andWhere("tps_code", tps_code)
      .groupBy("kontestan_id", "tps_code")
      .joinRelated("[kontestan, tps]")
      .joinRelated("kontestan.users");
  };

  static countAllElections = (bearer_id: number) => {
    return Elections.query()
      .select(
        "kontestan_id",
        "tps_code",
        "kontestan:users.name as kontestan",
        "tps.name as tps"
      )
      .count("elections.id", { as: "summary" })
      .from("elections")
      .where("kontestan.bearer_id", bearer_id)
      .andWhere("tps.bearer_id", bearer_id)
      .groupBy("kontestan_id", "tps_code")
      .joinRelated("[kontestan, tps]")
      .joinRelated("kontestan.users");
  };

  /**
   * ========================
   * ELECTION SUMMARY SERVICE
   * ========================
   */

  static getElectionSummary = (bearer_id: number) => {
    return ElectionSummary.query()
      .select(
        "election_summary.id",
        "election_summary.user_id",
        "election_summary.tps_code",
        "election_summary.kontestan_id",
        "users.name as auditor",
        "tps.name as tps",
        "kontestan:users.name as kontestan",
        "election_summary.summary"
      )
      .joinRelated("[users, kontestan, tps]")
      .where("users.bearer_id", bearer_id)
      .andWhere("kontestan.bearer_id", bearer_id)
      .joinRelated("kontestan.users");
  };

  static checkSummary = (data: ElectionSummary) => {
    return ElectionSummary.query()
      .select("id", "user_id", "tps_code", "kontestan_id")
      .where("user_id", data.user_id)
      .andWhere("tps_code", data.tps_code)
      .andWhere("kontestan_id", data.kontestan_id)
      .first();
  };

  static saveElectionSummary = async (data: ElectionSummary) => {
    return ElectionSummary.query().insert(data);
  };

  static updateElectionSummary = (data: ElectionSummary) => {
    return ElectionSummary.query().where("id", data.id).update(data);
  };
}
