import { Router } from "express";
import { elections } from "../../controller/elections";

const router = Router();

router.get("/", elections.countAllElections);
router
  .route("/summary")
  .get(elections.findElectionSummary)
  .post(elections.createElectionSummary);
  
router.get("/kontestan/:kontestan_id", elections.countElectionByKontestanId);
router.get("/tps/:tps_code", elections.countElectionByTpsCode);
router.get(
  "/kontestan/:kontestan_id/tps/:tps_code",
  elections.countElectionByKontestanIdAndTpsCode
);
router.post("/submit", elections.addElectionSubmit);
router.post("/poin", elections.addElectionPoin);

export { router as electionsRouter };
