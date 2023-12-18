import { Request, Response, NextFunction } from "express";
import { ElectionsService } from "../service/elections.services";
import { success } from "../utils/utils";
import { SendError } from "../middleware/error";
import { ElectionSummary } from "../model/election_summary";

const controller = {
  addElectionSubmit: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.body;
      if (!data.nik) throw new SendError("nik is required", 400);
      if (!data.name) throw new SendError("name is required", 400);
      const image = req.file;
      if (!image) throw new SendError("photo is required", 400);
      data.type = "submit";
      data.created_by = req.app.locals.credentials.id;
      data.poin = "1";
      data.photo = image.originalname;
      console.log({ data, image });
      const election = await ElectionsService.addElection(data);
      success(res, "vote successfully", 201, election);
      return;
    } catch (error) {
      next(error);
    }
  },

  countElectionByKontestanId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bearer_id = req.app.locals.credentials.bearer_id;
      const kontestan_id = req.params.kontestan_id;
      const elections = await ElectionsService.countElectionByKontestanId(
        kontestan_id,
        bearer_id
      );
      success(res, "count election by kontestan_id", 200, elections);
      return;
    } catch (error) {
      next(error);
    }
  },

  findDetailElectionSingle: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bearer_id = req.app.locals.credentials.bearer_id;
      const kontestan_id = req.params.kontestan_id;
      const tps_code = req.params.tps_code;
      const { limit, offset } = req.query;
      const elections =
        await ElectionsService.detailElectionsByKontestanIdAndTpsCode(
          kontestan_id,
          tps_code,
          bearer_id,
          Number(limit),
          Number(offset)
        );
      success(res, "count election by tps and kontestan id", 200, elections);
      return;
    } catch (error) {
      next(error);
    }
  },
  findParticipantByName: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bearer_id = req.app.locals.credentials.bearer_id;
      const kontestan_id = req.params.kontestan_id;
      const tps_code = req.params.tps_code;
      let name = req.query.name;
      const elections = await ElectionsService.searchParticipantByName(
        kontestan_id,
        tps_code,
        bearer_id,
        String(name)
      );
      success(res, "count election by tps and kontestan id", 200, elections);
      return;
    } catch (error) {
      next(error);
    }
  },

  /**
   * ===========================
   * ELECTION SUMMARY CONTROLLER
   * ===========================
   */

  findElectionSummary: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bearer_id = req.app.locals.credentials.bearer_id;
      const eSummary = await ElectionsService.getElectionSummaryV2(bearer_id);
      success(res, "find all election summary", 200, eSummary);
      return;
    } catch (error) {
      next(error);
    }
  },

  findESummaryByTpsKont: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const kontestan_id = req.params.kontestan_id;
      const bearer_id = req.app.locals.credentials.bearer_id;
      const eSummary = await ElectionsService.getCountElectionSummaryByKonId(
        bearer_id,
        kontestan_id
      );
      success(res, "find election by tps summary", 200, eSummary);
      return;
    } catch (error) {
      next(error);
    }
  },

  findESummaryByTpsCodeAndKontId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { kontestan_id, tps_code } = req.params;
      const bearer_id = req.app.locals.credentials.bearer_id;
      const eSummary = await ElectionsService.detailVoteByKontestanIdAndTpsCode(
        kontestan_id,
        tps_code,
        bearer_id
      );
      success(res, "find election by tps summary", 200, eSummary);
      return;
    } catch (error) {
      next(error);
    }
  },

  findAuditorByName: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bearer_id = req.app.locals.credentials.bearer_id;
      const kontestan_id = req.params.kontestan_id;
      const tps_code = req.params.tps_code;
      let name = req.query.name;
      const elections = await ElectionsService.searchAuditorByName(
        kontestan_id,
        tps_code,
        bearer_id,
        String(name)
      );
      success(res, "find counted data by auditor", 200, elections);
      return;
    } catch (error) {
      next(error);
    }
  },
};

export { controller as elections };
