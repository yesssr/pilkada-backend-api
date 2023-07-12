import { Request, Response, NextFunction } from "express";
import { KontestanService } from "../service/kontestan.services";
import { success } from "../utils/utils";
import { localError } from "../middleware/error";
import { KontestanModel } from "../model/kontestan";

const controller = {
  findAllKontestan: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearer_id = req.app.locals.credentials.bearer_id;
      const kontestan = await KontestanService.getAllKontestan(bearer_id);
      success(res, "find all kontestan", 200, kontestan);
      return;
    } catch (error) {
      next(error);
    }
  },

  findByIdKontestan: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const bearer_id = req.app.locals.credentials.bearer_id;
      const kontestan = await KontestanService.getByKontestanId(id, bearer_id);
      if (!kontestan) {
        let err = new localError();
        err.message = "kontestan not found";
        err.statusCode = 404;
        throw err;
      }
      success(res, "find kontestan by id", 200, kontestan);
      return;
    } catch (error) {
      next(error);
    }
  },

  createKontestan: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearer_id = req.app.locals.credentials.bearer_id;
      const data: KontestanModel = req.body;
      data.bearer_id = bearer_id;
      data.created_by = req.app.locals.credentials.email;
      const kontestan = await KontestanService.save(data);
      success(res, "kontestan successfully created", 201, kontestan);
      return;
    } catch (error) {
      next(error);
    }
  },

  updateKontestan: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data: KontestanModel = req.body;
      data.id = id;
      data.created_by = req.app.locals.credentials.email;
      const kontestan = await KontestanService.update(data);
      success(res, "success updated kontestan", 200, kontestan);
      return;
    } catch (error) {
      next(error);
    }
  },

  deleteKontestanById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const kontestan = await KontestanService.delete(id);
      success(res, "success delete kontestan", 200, kontestan);
      return;
    } catch (error) {
      next(error);
    }
  },

  findKontestanWithElections: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bearer_id = req.app.locals.credentials.bearer_id;
      const kontestan = await KontestanService.getKontestanWithElections(
        bearer_id
      );
      success(res, "find kontestan with list elections", 200, kontestan);
      return;
    } catch (error) {
      next(error);
    }
  },
};

export { controller as kontestan };
