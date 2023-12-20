"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesRouter = void 0;
const express_1 = require("express");
const roles_1 = require("../../controller/roles");
const router = (0, express_1.Router)();
exports.rolesRouter = router;
router
    .route("/")
    .get(roles_1.roles.findAllRoles)
    .post(roles_1.roles.createRole);
router
    .route("/:id")
    .get(roles_1.roles.findRoleById)
    .put(roles_1.roles.updateRole)
    .delete(roles_1.roles.deleteRoleById);
