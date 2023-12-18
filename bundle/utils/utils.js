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
exports.getUniqueNumber = exports.nameToSlug = exports.pagination = exports.success = exports.verifyToken = exports.createToken = exports.comparePass = exports.hashPass = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const slug_1 = __importDefault(require("slug"));
dotenv_1.default.config();
function hashPass(password) {
    const salt = (0, bcrypt_1.genSaltSync)(10);
    return (0, bcrypt_1.hashSync)(password, salt);
}
exports.hashPass = hashPass;
function comparePass(password, hashPass) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatch = yield (0, bcrypt_1.compare)(password, hashPass);
        return isMatch;
    });
}
exports.comparePass = comparePass;
function createToken(payload) {
    const token = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRED,
    });
    return token;
}
exports.createToken = createToken;
function verifyToken(token) {
    const isMatch = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET_KEY);
    return isMatch;
}
exports.verifyToken = verifyToken;
function success(res, msg, statusCode, data, pagination, token) {
    return res.status(statusCode).json({
        success: true,
        message: msg,
        statusCode: statusCode,
        data: data,
        credentials: token,
    });
}
exports.success = success;
function pagination(total, start, end) {
    let length = end - start - 1;
    let currentPage = Math.ceil(end / length);
    return {
        current_page: currentPage,
        next_page: currentPage + 1,
        previous_page: currentPage - 1,
        total_pages: Math.ceil(total / length),
        per_page: length,
        total_entries: total,
    };
}
exports.pagination = pagination;
function nameToSlug(string) {
    const options = {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: false,
        locale: "id",
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
    };
    const slugName = (0, slug_1.default)(string + "-" + getUniqueNumber());
    return slugName;
}
exports.nameToSlug = nameToSlug;
function getUniqueNumber() {
    let date = new Date();
    let dateUnique = date.toLocaleDateString().split("/");
    let timeUnique = date.toLocaleTimeString("it-IT").split(":");
    let day = dateUnique[1], month = dateUnique[0], year = dateUnique[2];
    let hours = timeUnique[0], minute = timeUnique[1], second = timeUnique[2];
    let dateNumber = year + "" + month + "" + day;
    let timeNumber = hours + "" + minute + "" + second;
    // let randNumber = Math.floor(Number(Math.random().toFixed(4)) * 10000);
    return dateNumber + "" + timeNumber;
}
exports.getUniqueNumber = getUniqueNumber;
