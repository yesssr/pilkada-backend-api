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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const users_services_1 = require("../service/users.services");
const utils_1 = require("../utils/utils");
const error_1 = require("../middleware/error");
const controller = {
    findAllUsers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield users_services_1.UsersService.getAllUsers();
            (0, utils_1.success)(res, "find all users", 200, users);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    findByIdUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const user = yield users_services_1.UsersService.getByIdUser(id);
            if (!user) {
                let err = new error_1.SendError();
                err.message = "user not found";
                err.statusCode = 404;
                throw err;
            }
            (0, utils_1.success)(res, "find user by id", 200, user);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    getUserProfile: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.app.locals.credentials.id;
            const user = yield users_services_1.UsersService.getByIdUser(id);
            if (!user) {
                let err = new error_1.SendError();
                err.message = "user not found";
                err.statusCode = 404;
                throw err;
            }
            const payload = {
                id: user.id,
                bearer_id: user.bearer_id,
                email: user.email,
                role_id: user.role_id,
                role: user.role,
                slug: user.slug,
            };
            // console.log(payload);
            const token = (0, utils_1.createToken)(payload);
            (0, utils_1.success)(res, "find user by id", 200, user, ...[,], token);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    updateUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const credentials = req.app.locals.credentials;
            const image = req.file;
            const data = req.body;
            let checkUser = yield users_services_1.UsersService.getByIdUser(credentials.id);
            const isMatch = yield (0, utils_1.comparePass)(data.password, checkUser === null || checkUser === void 0 ? void 0 : checkUser.password);
            if (!isMatch) {
                let err = new error_1.SendError();
                err.statusCode = 400;
                err.message = "wrong password !";
                throw err;
            }
            if (data.new_pass && data.conf_new_pass) {
                console.log(data.new_pass);
                if (data.new_pass != data.conf_new_pass) {
                    throw new error_1.SendError("New Pass is not match with Confirm Pass", 400);
                }
                data.password = data.conf_new_pass;
                // console.log(data.password);
            }
            if (!image && !data.photo)
                throw new error_1.SendError("photo is required", 400);
            if (image && data.photo != "default.png") {
                let filename = path_1.default.join(__dirname, `../../uploads/users/${data.photo}`);
                fs_1.default.unlink(filename, (err) => {
                    if (err) {
                        console.log(err);
                        throw new error_1.SendError("Error processing file", 501);
                    }
                });
            }
            if (image)
                data.photo = image === null || image === void 0 ? void 0 : image.originalname;
            data.id = credentials.id;
            data.role_id = `${credentials.role_id}`;
            data.bearer_id = credentials.bearer_id;
            console.log(data);
            delete data.new_pass;
            delete data.conf_new_pass;
            const users = yield users_services_1.UsersService.update(data);
            (0, utils_1.success)(res, "success updated users", 200, users);
            return;
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }),
    deleteUserById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const user = yield users_services_1.UsersService.delete(id);
            (0, utils_1.success)(res, "success delete user", 200, user);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    findKontestanNotLink: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bearer_id = req.app.locals.credentials.bearer_id;
            const kontestans = yield users_services_1.UsersService.getkontestanNotLink(bearer_id);
            (0, utils_1.success)(res, "find kontestan not linked", 200, kontestans);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.users = controller;
