import { Response, Router, Request, NextFunction } from "express";
import { Provinces } from "../../model/provinces";
import { Regencies } from "../../model/regencies";
import { Districts } from "../../model/districts";
import { Villages } from "../../model/villages";
import { success } from "../../utils/utils";
import { localError } from "../../middleware/error";

const router = Router();

router.get(
  "/provinces",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const provinces = await Provinces.query().select(
        "id",
        "name",
        "created_at",
        "updated_at"
      );

      if (provinces.length < 1) {
        let err = new localError();
        err.message = "provinces not found";
        err.statusCode = 404;
        throw err;
      }
      success(res, "find all provinces", 200, provinces);
      return;
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/regencies/:province_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.province_id;
      const regencies = await Regencies.query()
        .select("id", "name", "province_id", "created_at", "updated_at")
        .where("province_id", id);

      if (regencies.length < 1) {
        let err = new localError();
        err.message = "regencies not found";
        err.statusCode = 404;
        throw err;
      }
      success(res, "find regencies by province_id", 200, regencies);
      return;
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/districts/:regency_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.regency_id;
      const districts = await Districts.query()
        .select("id", "name", "regency_id", "created_at", "updated_at")
        .where("regency_id", id);

      if (districts.length < 1) {
        let err = new localError();
        err.message = "districts not found";
        err.statusCode = 404;
        throw err;
      }
      success(res, "find district by regency id", 200, districts);
      return;
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/villages/:district_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.district_id;
      const villages = await Villages.query()
        .select("id", "name", "district_id", "created_at", "updated_at")
        .where("district_id", id);

      if (villages.length < 1) {
        let err = new localError();
        err.message = "villages not found";
        err.statusCode = 404;
        throw err;
      }
      success(res, "find villages by district id", 200, villages);
      return;
    } catch (error) {
      next(error);
    }
  }
);

export { router as regionRouter };
