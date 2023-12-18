import { Router } from "express";
import { tps } from "../../controller/tps";

const router = Router();

router.route("/").get(tps.findAllTps).post(tps.createTps);
router.get("/search", tps.searchTpsByName);

router.route("/:id").put(tps.updateTps).delete(tps.deleteTpsById);

export { router as tpsRouter };
