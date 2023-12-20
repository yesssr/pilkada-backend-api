"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_1 = require("../../controller/users");
const multer_1 = require("../../helper/multer");
const router = (0, express_1.Router)();
exports.usersRouter = router;
router.get("/", users_1.users.findAllUsers);
router.get("/kontestan-not-linked", users_1.users.findKontestanNotLink);
router.get("/profile", users_1.users.getUserProfile);
router
    .route("/:id")
    .get(users_1.users.findByIdUser)
    .put((0, multer_1.uploadImage)("./uploads/users/").single("file"), users_1.users.updateUser)
    .delete(users_1.users.deleteUserById);
