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
      let msg = err.message.split(",")[0];
      return res.status(err.statusCode).json({
        success: false,
        statusCode: err.statusCode,
        message: msg,
      });
    }
    if (err instanceof UniqueViolationError) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: `${err.columns} already used`,
      });
    }
    if (err instanceof ForeignKeyViolationError) {
      let msg = err.constraint.split("_");
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: `${msg[1]} not available`,
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
      statusCode: 500,
      message: err,
    });
  }
}
