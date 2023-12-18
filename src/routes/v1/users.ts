import { Router } from "express";
import { users } from "../../controller/users";

const router = Router();

router.get("/", users.findAllUsers);
router.get("/kontestan-not-linked", users.findKontestanNotLink);
router.get("/profile", users.getUserProfile);
router.get("/auditor/tps/:tps_code", users.findAuditor);
router.get("/auditor-supervisi/tps/:tps_code", users.findAuditorSupervisi);
router.get("/auditor-supervisi", users.findAuditorSWithoutTps);
router.get("/auditor", users.findAuditorWithoutTps);
router.post("/add-auditor/tps/:tps_code", users.addTpsToAuditor);
router.delete("/auditor/:auditor_id/tps/:tps_code", users.deleteAuditor);
router
  .route("/:id")
  .get(users.findByIdUser)
  .put(users.updateUser)
  .delete(users.deleteUserById);

export { router as usersRouter };
