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
exports.kontestanRouter = void 0;
const express_1 = require("express");
const kontestan_1 = require("../../controller/kontestan");
const multer_1 = require("../../helper/multer");
const kontestan_period_1 = require("../../model/kontestan.period");
const utils_1 = require("../../utils/utils");
const router = (0, express_1.Router)();
exports.kontestanRouter = router;
router.get("/", kontestan_1.kontestan.findAllKontestan);
router.post("/", (0, multer_1.uploadImage)("./uploads/kontestan/").single("file"), kontestan_1.kontestan.createKontestan);
router.get("/elections", kontestan_1.kontestan.findKontestanWithElections);
router.get("/service-period", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield kontestan_period_1.KontestanPeriodModel.query().select("id", "service_name", "duration");
        (0, utils_1.success)(res, "get all kontestan service", 200, service);
        return;
    }
    catch (error) {
        next(error);
    }
}));
router
    .route("/:id")
    .get(kontestan_1.kontestan.findByIdKontestan)
    .put((0, multer_1.uploadImage)("./uploads/kontestan/").single("file"), kontestan_1.kontestan.updateKontestan)
    .delete(kontestan_1.kontestan.deleteKontestanById);
