"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const error_1 = require("../middleware/error");
const multerDir = (directory) => {
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, directory);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    });
    return storage;
};
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(file.originalname);
    if (extname) {
        cb(null, true);
    }
    else {
        cb(new error_1.SendError("Image uploaded is not of type jpg/jpeg or png", 400), false);
    }
};
function uploadImage(directory) {
    const upload = (0, multer_1.default)({
        storage: multerDir(directory),
        fileFilter: fileFilter,
        limits: { fileSize: 5000000 },
    });
    return upload;
}
exports.uploadImage = uploadImage;
