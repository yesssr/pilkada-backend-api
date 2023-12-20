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
exports.authController = void 0;
const utils_1 = require("../utils/utils");
const user_tokens_services_1 = require("../service/user_tokens.services");
const users_services_1 = require("../service/users.services");
const auth_services_1 = require("../service/auth.services");
const error_1 = require("./error");
const controller = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, name, bearer_id, phone, password, token } = req.body;
            let checkToken = yield user_tokens_services_1.UserTokenService.checkStatusToken(token);
            if (!checkToken) {
                let err = new error_1.SendError();
                err.message = "token not registered !";
                err.statusCode = 400;
                throw err;
            }
            if ((checkToken === null || checkToken === void 0 ? void 0 : checkToken.status) !== "available") {
                let err = new error_1.SendError();
                err.message = "token already used !";
                err.statusCode = 400;
                throw err;
            }
            const data = {
                email,
                bearer_id,
                name,
                phone,
                role_id: checkToken.role_id,
                password,
            };
            const user = yield users_services_1.UsersService.save(data);
            const user_token = yield user_tokens_services_1.UserTokenService.addUserIdToToken(user.id, token);
            (0, utils_1.success)(res, "user succesfully registered", 201, user_token);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const find = yield auth_services_1.AuthService.getByUsersCredentials(email);
            if (!find) {
                let err = new error_1.SendError();
                err.statusCode = 404;
                err.message = "email not registered !";
                throw err;
            }
            const isMatch = yield (0, utils_1.comparePass)(password, find.password);
            if (!isMatch) {
                let err = new error_1.SendError();
                err.statusCode = 400;
                err.message = "wrong password !";
                throw err;
            }
            delete find.password;
            const payload = {
                id: find.id,
                bearer_id: find.bearer_id,
                email: find.email,
                role_id: find.role_id,
                role: find.role,
                slug: find.slug,
            };
            // console.log(payload);
            const token = (0, utils_1.createToken)(payload);
            (0, utils_1.success)(res, "login successfully !", 200, find, ...[,], token);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    auth: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const authorization = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!authorization) {
                let err = new error_1.SendError();
                err.statusCode = 401;
                err.message = "invalid credentials !";
                throw err;
            }
            const payload = (0, utils_1.verifyToken)(authorization);
            if (!payload) {
                let err = new error_1.SendError();
                err.statusCode = 401;
                err.message = "invalid credentials !";
                throw err;
            }
            req.app.locals.credentials = payload;
            next();
            return;
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.authController = controller;
