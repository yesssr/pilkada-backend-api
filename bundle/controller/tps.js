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
exports.tps = void 0;
const tps_services_1 = require("../service/tps.services");
const utils_1 = require("../utils/utils");
const error_1 = require("../middleware/error");
const controller = {
    findAllTps: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let bearer_id = req.app.locals.credentials.bearer_id;
            let { limit, offset } = req.query;
            console.log(req.query);
            const tps = yield tps_services_1.TpsService.getAllTps(bearer_id, Number(limit), Number(offset));
            if (tps.length < 1) {
                let err = new error_1.SendError();
                err.message = "tps not found";
                err.statusCode = 404;
                throw err;
            }
            (0, utils_1.success)(res, "find all tps", 200, tps);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    searchTpsByName: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let bearer_id = req.app.locals.credentials.bearer_id;
            let name = req.query.name;
            console.log(req.query);
            const tps = yield tps_services_1.TpsService.searchTpsByName(bearer_id, String(name));
            if (tps.length < 1) {
                let err = new error_1.SendError();
                err.message = "tps not found";
                err.statusCode = 404;
                throw err;
            }
            (0, utils_1.success)(res, "find all tps", 200, tps);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    createTps: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userCredentials = req.app.locals.credentials;
            const data = req.body;
            // console.log(data);
            data.user_id = userCredentials.id;
            data.bearer_id = userCredentials.bearer_id;
            const tps = yield tps_services_1.TpsService.save(data);
            (0, utils_1.success)(res, "tps successfully created", 201, tps);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    updateTps: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const userCredentials = req.app.locals.credentials;
            const data = req.body;
            data.id = id;
            data.user_id = userCredentials.id;
            data.bearer_id = userCredentials.bearer_id;
            const tps = yield tps_services_1.TpsService.update(data);
            if (tps != 1)
                throw new error_1.SendError("Error updateing tps", 500);
            (0, utils_1.success)(res, "success updated tps", 200, tps);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    deleteTpsById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const userCredentials = req.app.locals.credentials;
            const tps = yield tps_services_1.TpsService.deleteById(id);
            if (!tps)
                throw new error_1.SendError("Error deleting tps", 500);
            (0, utils_1.success)(res, "success delete tps", 200, tps);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.tps = controller;
