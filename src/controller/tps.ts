import { Request, Response, NextFunction } from "express";
import { TpsService } from "../service/tps.services";
import { success } from "../utils/utils";
import { localError } from "../middleware/error";
import { Tps } from "../model/tps";

const controller = {
  findAllTps: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearer_id = req.app.locals.credentials.bearer_id;
      const tps = await TpsService.getAllTps(bearer_id);
      success(res, "find all tps", 200, tps);
      return;
    } catch (error) {
      next(error);
    }
  },

  findByIdTps: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const bearer_id = req.app.locals.credentials.bearer_id;
      const tps = await TpsService.getByTpsId(id, bearer_id);
      if (!tps) {
        let err = new localError();
        err.message = "tps not found";
        err.statusCode = 404;
        throw err;
      }
      success(res, "find tps by id", 200, tps);
      return;
    } catch (error) {
      next(error);
    }
  },

  createTps: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearer_id = req.app.locals.credentials.bearer_id;
      const data: Tps = req.body;
      data.bearer_id = bearer_id;
      const tps = await TpsService.save(data);
      success(res, "tps successfully created", 201, tps);
      return;
    } catch (error) {
      next(error);
    }
  },

  updateTps: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data: Tps = req.body;
      data.id = id;
      const tps = await TpsService.update(data);
      success(res, "success updated tps", 200, tps);
      return;
    } catch (error) {
      next(error);
    }
  },

  deleteTpsById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const tps = await TpsService.deleteById(id);
      success(res, "success delete tps", 200, tps);
      return;
    } catch (error) {
      next(error);
    }
  },

  findTpsWithElections: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bearer_id = req.app.locals.credentials.bearer_id;
      const elections = await TpsService.getTpsWithElections(bearer_id);
      success(res, "find tps with list elections", 200, elections);
      return;
    } catch (error) {
      next(error);
    }
  },
};

export { controller as tps };
