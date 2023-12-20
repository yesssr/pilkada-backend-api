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
exports.kontestan = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const kontestan_services_1 = require("../service/kontestan.services");
const utils_1 = require("../utils/utils");
const error_1 = require("../middleware/error");
const controller = {
    findAllKontestan: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bearer_id = req.app.locals.credentials.bearer_id;
            const kontestan = yield kontestan_services_1.KontestanService.getAllKontestan(bearer_id);
            (0, utils_1.success)(res, "find all kontestan", 200, kontestan);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    findByIdKontestan: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const bearer_id = req.app.locals.credentials.bearer_id;
            const kontestan = yield kontestan_services_1.KontestanService.getByKontestanId(id, bearer_id);
            if (!kontestan) {
                let err = new error_1.SendError();
                err.message = "kontestan not found";
                err.statusCode = 404;
                throw err;
            }
            (0, utils_1.success)(res, "find kontestan by id", 200, kontestan);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    createKontestan: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const credentials = req.app.locals.credentials;
            const data = req.body;
            const image = req.file;
            console.log(image);
            if (!image)
                throw new error_1.SendError("banner is required", 400);
            data.created_by = credentials.id;
            data.banner = image.originalname;
            const kontestan = yield kontestan_services_1.KontestanService.save(data);
            (0, utils_1.success)(res, "kontestan successfully created", 201, kontestan);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    updateKontestan: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const image = req.file;
            const data = req.body;
            if (!image && !data.banner)
                throw new error_1.SendError("banner is required", 400);
            if (image) {
                let filename = path_1.default.join(__dirname, `../../uploads/kontestan/${data.banner}`);
                fs_1.default.unlink(filename, (err) => {
                    if (err) {
                        console.log(err);
                        throw new error_1.SendError("Error processing file", 501);
                    }
                });
                data.banner = image.originalname;
            }
            data.id = id;
            data.created_by = req.app.locals.credentials.id;
            const kontestan = yield kontestan_services_1.KontestanService.update(data);
            (0, utils_1.success)(res, "success updated kontestan", 200, kontestan);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    deleteKontestanById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const kontestan = yield kontestan_services_1.KontestanService.delete(id);
            (0, utils_1.success)(res, "success delete kontestan", 200, kontestan);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
    findKontestanWithElections: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bearer_id = req.app.locals.credentials.bearer_id;
            const kontestan = yield kontestan_services_1.KontestanService.getKontestanWithElections(bearer_id);
            (0, utils_1.success)(res, "find kontestan with list elections", 200, kontestan);
            return;
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.kontestan = controller;
