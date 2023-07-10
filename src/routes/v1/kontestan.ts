import { Router } from "express";
import { kontestan } from "../../controller/kontestan";

const router = Router();

router.get("/", kontestan.findAllKontestan);
router.post("/", kontestan.createKontestan);
router.get("/elections", kontestan.findKontestanWithElections);
router
  .route("/:id")
  .get(kontestan.findByIdKontestan)
  .put(kontestan.updateKontestan)
  .delete(kontestan.deleteKontestanById);

export { router as kontestanRouter };
