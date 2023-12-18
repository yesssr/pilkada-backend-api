import { Request, Response, NextFunction } from "express";
import { TpsService } from "../service/tps.services";
import { success } from "../utils/utils";
import { SendError } from "../middleware/error";
import { Tps } from "../model/tps";
import { UsersService } from "../service/users.services";

const controller = {
  findAllTps: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let bearer_id = req.app.locals.credentials.bearer_id;
      let { limit, offset } = req.query;
      console.log(req.query);
      const tps = await TpsService.getAllTps(
        bearer_id,
        Number(limit),
        Number(offset)
      );
      if (tps.length < 1) {
        let err = new SendError();
        err.message = "tps not found";
        err.statusCode = 404;
        throw err;
      }
      success(res, "find all tps", 200, tps);
      return;
    } catch (error) {
      next(error);
    }
  },

  searchTpsByName: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let bearer_id = req.app.locals.credentials.bearer_id;
      let name = req.query.name;
      console.log(req.query);
      const tps = await TpsService.searchTpsByName(bearer_id, String(name));
      if (tps.length < 1) {
        let err = new SendError();
        err.message = "tps not found";
        err.statusCode = 404;
        throw err;
      }
      success(res, "find all tps", 200, tps);
      return;
    } catch (error) {
      next(error);
    }
  },

  createTps: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCredentials = req.app.locals.credentials;
      const data: Tps = req.body;
      // console.log(data);
      data.user_id = userCredentials.id;
      data.bearer_id = userCredentials.bearer_id;
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
      const userCredentials = req.app.locals.credentials;
      const data: Tps = req.body;
      data.id = id;
      data.user_id = userCredentials.id;
      data.bearer_id = userCredentials.bearer_id;
      const tps = await TpsService.update(data);
      if (tps != 1) throw new SendError("Error updateing tps", 500);
      success(res, "success updated tps", 200, tps);
      return;
    } catch (error) {
      next(error);
    }
  },

  deleteTpsById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const userCredentials = req.app.locals.credentials;

      const tps = await TpsService.deleteById(id);
      if (!tps) throw new SendError("Error deleting tps", 500);

      success(res, "success delete tps", 200, tps);
      return;
    } catch (error) {
      next(error);
    }
  },
};

export { controller as tps };
