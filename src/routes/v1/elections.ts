import { Router } from "express";
import { elections } from "../../controller/elections";
import { uploadImage } from "../../helper/multer";

const router = Router();

router.get("/summary/tps/:kontestan_id", elections.findESummaryByTpsKont);
router.get("/summary", elections.findElectionSummary);

router.get("/kontestan/:kontestan_id", elections.countElectionByKontestanId);
router.get(
  "/kontestan/:kontestan_id/tps/:tps_code",
  elections.findDetailElectionSingle
);
router.get(
  "/summary/kontestan/:kontestan_id/tps/:tps_code",
  elections.findESummaryByTpsCodeAndKontId
);
router.get(
  "/summary/kontestan/:kontestan_id/tps/:tps_code/auditor",
  elections.findAuditorByName
);
router.get(
  "/kontestan/:kontestan_id/tps/:tps_code/participant",
  elections.findParticipantByName
);
router.post(
  "/submit",
  uploadImage("./uploads/participant/").single("file"),
  elections.addElectionSubmit
);

export { router as electionsRouter };
