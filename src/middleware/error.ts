import { Response, Request, NextFunction } from "express";
import {
  ForeignKeyViolationError,
  UniqueViolationError,
  ValidationError,
} from "objection";

export class localError extends Error {
  message!: string;
  statusCode!: number;
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    console.error(err.stack, err.message);
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({
        success: false,
        statusCode: err.statusCode,
        message: err.message,
      });
    }
    if (err instanceof UniqueViolationError) {
      return res.status(400).json({
        success: false,
        message: `${err.columns} sudah digunakan`,
      });
    }
    if (err instanceof ForeignKeyViolationError) {
      let msg = err.constraint.split("_");
      return res.status(400).json({
        success: false,
        message: `${msg[1]} tidak tersedia`,
      });
    }
    if (err instanceof localError) {
      return res.status(err.statusCode).json({
        success: false,
        statusCode: err.statusCode,
        message: err.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
}
