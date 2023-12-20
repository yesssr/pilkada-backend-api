"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
exports.authRouter = router;
router.post("/register", auth_1.authController.register);
router.post("/login", auth_1.authController.login);
