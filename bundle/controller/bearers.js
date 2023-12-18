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
exports.findAllBearers = void 0;
const bearer_services_1 = require("../service/bearer.services");
const utils_1 = require("../utils/utils");
function findAllBearers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bearers = yield bearer_services_1.BearerService.getAllBeares();
            (0, utils_1.success)(res, "find all bearers", 200, bearers);
            return;
        }
        catch (error) {
            next(error);
        }
    });
}
exports.findAllBearers = findAllBearers;
