"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BearerService = void 0;
const bearers_1 = require("../model/bearers");
class BearerService {
}
exports.BearerService = BearerService;
BearerService.getAllBeares = () => {
    return bearers_1.Bearers.query().select("id", "name", "codename", "logo");
};
