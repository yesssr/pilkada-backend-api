"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRouter = void 0;
const express_1 = require("express");
const user_tokens_1 = require("../../controller/user_tokens");
const router = (0, express_1.Router)();
exports.tokenRouter = router;
router.get("/", user_tokens_1.token.findAllTokens);
router.get("/:status/status", user_tokens_1.token.findTokensByStatus);
router.post("/generate", user_tokens_1.token.generateToken);
router
    .route("/:id")
    .get(user_tokens_1.token.findByIdToken)
    .delete(user_tokens_1.token.deleteTokenById);
