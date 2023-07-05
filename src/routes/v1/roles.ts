import { Router } from "express";
import { roles } from "../../controller/roles";

const router = Router();

router
  .route("/")
  .get(roles.findAllRoles)
  .post(roles.createRole);

router
  .route("/:id")
  .get(roles.findRoleById)
  .put(roles.updateRole)
  .delete(roles.deleteRoleById);

export { router as rolesRouter };