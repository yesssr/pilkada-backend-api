import { Request, Response, NextFunction } from "express";
import { BearerService } from "../service/bearer.services";
import { success } from "../utils/utils";

export async function findAllBearers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bearers = await BearerService.getAllBeares();
    success(res, "find all bearers", 200, bearers);
    return;
  } catch (error) {
    next(error);
  }
}
