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
exports.roles = void 0;
const roles_services_1 = require("../service/roles.services");
const utils_1 = require("../utils/utils");
const error_1 = require("../middleware/error");
const controller = {
    findAllRoles: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const roles = yield roles_services_1.RoleService.getAllRoles();
            (0, utils_1.success)(res, "find all roles", 200, roles);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    findRoleById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const role = yield roles_services_1.RoleService.getByRoleId(id);
            if (!role) {
                let err = new error_1.SendError();
                err.message = "role not found";
                err.statusCode = 404;
            }
            (0, utils_1.success)(res, "find role by id", 200, role);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    createRole: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            const role = yield roles_services_1.RoleService.save(data);
            (0, utils_1.success)(res, "role successfully created", 201, role);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    updateRole: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const data = req.body;
            data.id = id;
            const role = yield roles_services_1.RoleService.update(data);
            (0, utils_1.success)(res, "role successfully updated", 200, role);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    deleteRoleById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const role = yield roles_services_1.RoleService.deleteById(id);
            (0, utils_1.success)(res, "role successfully deleted", 200, role);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.roles = controller;
