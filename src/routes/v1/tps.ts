import { Router } from "express";
import { tps } from "../../controller/tps";

const router = Router();

router.route("/").get(tps.findAllTps).post(tps.createTps);
router.get("/elections", tps.findTpsWithElections);

router
  .route("/:id")
  .get(tps.findByIdTps)
  .put(tps.updateTps)
  .delete(tps.deleteTpsById);

export { router as tpsRouter };
