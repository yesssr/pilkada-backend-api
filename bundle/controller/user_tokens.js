"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
const user_tokens_services_1 = require("../service/user_tokens.services");
const utils_1 = require("../utils/utils");
const error_1 = require("../middleware/error");
const controller = {
    findAllTokens: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tokens = yield user_tokens_services_1.UserTokenService.getAllToken();
            (0, utils_1.success)(res, "find all token", 200, tokens);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    findTokensByStatus: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const status = req.params.status;
            const tokens = yield user_tokens_services_1.UserTokenService.getAllToken(status);
            (0, utils_1.success)(res, "find all token", 200, tokens);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    findByIdToken: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const token = yield user_tokens_services_1.UserTokenService.getByTokenId(id);
            if (!token) {
                let err = new error_1.SendError();
                err.message = "token not found";
                err.statusCode = 404;
                throw err;
            }
            (0, utils_1.success)(res, "find token by id", 200, token);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    generateToken: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const total = req.body.total;
            const token = yield user_tokens_services_1.UserTokenService.generateToken(total);
            (0, utils_1.success)(res, "token successfully created", 201, token);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    deleteTokenById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const token = yield user_tokens_services_1.UserTokenService.deleteById(id);
            (0, utils_1.success)(res, "success delete token", 200, token);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.token = controller;
