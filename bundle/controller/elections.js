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
exports.elections = void 0;
const elections_services_1 = require("../service/elections.services");
const utils_1 = require("../utils/utils");
const error_1 = require("../middleware/error");
const controller = {
    addElectionSubmit: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            if (!data.nik)
                throw new error_1.SendError("nik is required", 400);
            if (!data.name)
                throw new error_1.SendError("name is required", 400);
            const image = req.file;
            if (!image)
                throw new error_1.SendError("photo is required", 400);
            data.type = "submit";
            data.created_by = req.app.locals.credentials.id;
            data.poin = "1";
            data.photo = image.originalname;
            console.log({ data, image });
            const election = yield elections_services_1.ElectionsService.addElection(data);
            (0, utils_1.success)(res, "vote successfully", 201, election);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    countElectionByKontestanId: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bearer_id = req.app.locals.credentials.bearer_id;
            const kontestan_id = req.params.kontestan_id;
            const elections = yield elections_services_1.ElectionsService.countElectionByKontestanId(kontestan_id, bearer_id);
            (0, utils_1.success)(res, "count election by kontestan_id", 200, elections);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    findDetailElectionSingle: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bearer_id = req.app.locals.credentials.bearer_id;
            const kontestan_id = req.params.kontestan_id;
            const tps_code = req.params.tps_code;
            const { limit, offset } = req.query;
            const elections = yield elections_services_1.ElectionsService.detailElectionsByKontestanIdAndTpsCode(kontestan_id, tps_code, bearer_id, Number(limit), Number(offset));
            (0, utils_1.success)(res, "count election by tps and kontestan id", 200, elections);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    findParticipantByName: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bearer_id = req.app.locals.credentials.bearer_id;
            const kontestan_id = req.params.kontestan_id;
            const tps_code = req.params.tps_code;
            let name = req.query.name;
            const elections = yield elections_services_1.ElectionsService.searchParticipantByName(kontestan_id, tps_code, bearer_id, String(name));
            (0, utils_1.success)(res, "count election by tps and kontestan id", 200, elections);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    /**
     * ===========================
     * ELECTION SUMMARY CONTROLLER
     * ===========================
     */
    findElectionSummary: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bearer_id = req.app.locals.credentials.bearer_id;
            const eSummary = yield elections_services_1.ElectionsService.getElectionSummaryV2(bearer_id);
            (0, utils_1.success)(res, "find all election summary", 200, eSummary);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    findESummaryByTpsKont: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const kontestan_id = req.params.kontestan_id;
            const bearer_id = req.app.locals.credentials.bearer_id;
            const eSummary = yield elections_services_1.ElectionsService.getCountElectionSummaryByKonId(bearer_id, kontestan_id);
            (0, utils_1.success)(res, "find election by tps summary", 200, eSummary);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    findESummaryKontGroupByTps: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const kontestan_id = req.params.kontestan_id;
            const bearer_id = req.app.locals.credentials.bearer_id;
            const eSummary = yield elections_services_1.ElectionsService.getCountElectionSummaryByKonIdGroupByTps(bearer_id, kontestan_id);
            (0, utils_1.success)(res, "find election group by tps summary", 200, eSummary);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    findESummaryByTpsCodeAndKontId: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { kontestan_id, tps_code } = req.params;
            const bearer_id = req.app.locals.credentials.bearer_id;
            const eSummary = yield elections_services_1.ElectionsService.detailVoteByKontestanIdAndTpsCode(kontestan_id, tps_code, bearer_id);
            (0, utils_1.success)(res, "find election by tps summary", 200, eSummary);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    findAuditorByName: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bearer_id = req.app.locals.credentials.bearer_id;
            const kontestan_id = req.params.kontestan_id;
            const tps_code = req.params.tps_code;
            let name = req.query.name;
            const elections = yield elections_services_1.ElectionsService.searchAuditorByName(kontestan_id, tps_code, bearer_id, String(name));
            (0, utils_1.success)(res, "find counted data by auditor", 200, elections);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.elections = controller;
