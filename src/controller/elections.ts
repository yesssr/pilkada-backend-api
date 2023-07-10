import { Request, Response, NextFunction } from "express";
import { ElectionsService } from "../service/elections.services";
import { success } from "../utils/utils";
import { localError } from "../middleware/error";
import { ElectionSummary } from "../model/election_summary";

const controller = {
  addElectionSubmit: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.body;
      if (!data.nik) throw new localError("nik is required", 400);
      if (!data.name) throw new localError("name is required", 400);
      data.type = "submit";
      data.user_id = req.app.locals.credentials.id;
      data.created_by = req.app.locals.credentials.id;
      const election = await ElectionsService.addElection(data);
      success(
        res,
        "successfully add elections with submit method",
        201,
        election
      );
      return;
    } catch (error) {
      next(error);
    }
  },

  addElectionPoin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      data.type = "import";
      data.poin = "1";
      data.user_id = req.app.locals.credentials.id;
      data.created_by = req.app.locals.credentials.id;
      const election = await ElectionsService.addElection(data);
      success(
        res,
        "successfully add elections with poin method",
        201,
        election
      );
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
      const kontestan_id = req.params.kontestan_id;
      const elections = await ElectionsService.countElectionByKontestanId(
        kontestan_id
      );
      success(res, "count election by kontestan_id", 200, elections);
      return;
    } catch (error) {
      next(error);
    }
  },

  countElectionByKontestanIdAndTpsCode: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const kontestan_id = req.params.kontestan_id;
      const tps_code = req.params.tps_code;
      const elections =
        await ElectionsService.countElectionByKontestanIdAndTpsCode(
          kontestan_id,
          tps_code
        );
      success(res, "count election by tps and kontestan id", 200, elections);
      return;
    } catch (error) {
      next(error);
    }
  },

  countElectionByTpsCode: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const tps_code = req.params.tps_code;
      const elections = await ElectionsService.countElectionByTpsCode(tps_code);
      success(res, "count elections by tps", 200, elections);
      return;
    } catch (error) {
      next(error);
    }
  },

  countAllElections: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const elections = await ElectionsService.countAllElections();
      success(res, "count all elections", 200, elections);
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

  createElectionSummary: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data: ElectionSummary = req.body;
      let checkSummary = await ElectionsService.checkSummary(data);
      if (checkSummary) {
        data.id = checkSummary.id;
        const eSummary = await ElectionsService.updateElectionSummary(data);
        success(res, "success updated election summary", 200, eSummary);
        return;
      } else {
        const eSummary = await ElectionsService.saveElectionSummary(data);
        success(res, "successfully add election summary", 201, eSummary);
        return;
      }
    } catch (error) {
      next(error);
    }
  },

  findElectionSummary: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const eSummary = await ElectionsService.getElectionSummary();
      success(res, "find all election summary", 200, eSummary);
      return;
    } catch (error) {
      next(error);
    }
  },
};

export { controller as elections };
