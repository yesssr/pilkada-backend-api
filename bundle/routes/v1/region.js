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
exports.regionRouter = void 0;
const express_1 = require("express");
const error_1 = require("../../middleware/error");
const provinces_1 = require("../../model/provinces");
const regencies_1 = require("../../model/regencies");
const districts_1 = require("../../model/districts");
const villages_1 = require("../../model/villages");
const utils_1 = require("../../utils/utils");
const router = (0, express_1.Router)();
exports.regionRouter = router;
router.get("/provinces", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provinces = yield provinces_1.Provinces.query().select("id", "name", "created_at", "updated_at");
        if (provinces.length < 1) {
            let err = new error_1.SendError();
            err.message = "provinces not found";
            err.statusCode = 404;
            throw err;
        }
        (0, utils_1.success)(res, "find all provinces", 200, provinces);
        return;
    }
    catch (error) {
        next(error);
    }
}));
router.get("/regencies/:province_id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.province_id;
        const regencies = yield regencies_1.Regencies.query()
            .select("id", "name", "province_id", "created_at", "updated_at")
            .where("province_id", id);
        if (regencies.length < 1) {
            let err = new error_1.SendError();
            err.message = "regencies not found";
            err.statusCode = 404;
            throw err;
        }
        (0, utils_1.success)(res, "find regencies by province_id", 200, regencies);
        return;
    }
    catch (error) {
        next(error);
    }
}));
router.get("/districts/:regency_id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.regency_id;
        const districts = yield districts_1.Districts.query()
            .select("id", "name", "regency_id", "created_at", "updated_at")
            .where("regency_id", id);
        if (districts.length < 1) {
            let err = new error_1.SendError();
            err.message = "districts not found";
            err.statusCode = 404;
            throw err;
        }
        (0, utils_1.success)(res, "find district by regency id", 200, districts);
        return;
    }
    catch (error) {
        next(error);
    }
}));
router.get("/villages/:district_id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.district_id;
        const villages = yield villages_1.Villages.query()
            .select("id", "name", "district_id", "created_at", "updated_at")
            .where("district_id", id);
        if (villages.length < 1) {
            let err = new error_1.SendError();
            err.message = "villages not found";
            err.statusCode = 404;
            throw err;
        }
        (0, utils_1.success)(res, "find villages by district id", 200, villages);
        return;
    }
    catch (error) {
        next(error);
    }
}));
