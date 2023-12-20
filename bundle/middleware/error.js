"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.SendError = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const objection_1 = require("objection");
class SendError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.SendError = SendError;
function errorHandler(err, req, res, next) {
    if (err) {
        if (err instanceof objection_1.ValidationError) {
            let msg = err.message.split(",")[0];
            return res.status(err.statusCode).json({
                success: false,
                statusCode: err.statusCode,
                message: msg,
            });
        }
        if (err instanceof objection_1.UniqueViolationError) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: `${err.columns} already used`,
            });
        }
        if (err instanceof objection_1.ForeignKeyViolationError) {
            let msg = err.constraint.split("_");
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: `${msg[1]} not available`,
            });
        }
        if (err instanceof jsonwebtoken_1.TokenExpiredError) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: err.message,
            });
        }
        if (err instanceof SendError) {
            return res.status(err.statusCode).json({
                success: false,
                statusCode: err.statusCode,
                message: err.message,
            });
        }
        (() => {
            console.log(err);
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: err,
            });
        })();
    }
}
exports.errorHandler = errorHandler;
