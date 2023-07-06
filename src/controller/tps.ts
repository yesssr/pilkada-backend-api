import { Request, Response, NextFunction } from "express";
import { TpsService } from "../service/tps.services";
import { success } from "../utils/utils";
import { localError } from "../middleware/error";
import { Tps } from "../model/tps";

const controller = {
  findAllTps: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tps = await TpsService.getAllTps();
      success(res, "find all tps", 200, tps);
      return;
    } catch (error) {
      next(error);
    }
  },

  findByIdTps: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const tps = await TpsService.getByTpsId(id);
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
      const data: Tps = req.body;
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
};

export { controller as tps };
