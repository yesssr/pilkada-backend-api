"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tpsRouter = void 0;
const express_1 = require("express");
const tps_1 = require("../../controller/tps");
const router = (0, express_1.Router)();
exports.tpsRouter = router;
router.route("/").get(tps_1.tps.findAllTps).post(tps_1.tps.createTps);
router.get("/search", tps_1.tps.searchTpsByName);
router.route("/:id").put(tps_1.tps.updateTps).delete(tps_1.tps.deleteTpsById);
