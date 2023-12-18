import { NextFunction, Router, Request, Response } from "express";
import { kontestan } from "../../controller/kontestan";
import { uploadImage } from "../../helper/multer";
import { KontestanPeriodModel } from "../../model/kontestan.period";
import { success } from "../../utils/utils";

const router = Router();

router.get("/", kontestan.findAllKontestan);
router.post(
  "/",
  uploadImage("./uploads/kontestan/").single("file"),
  kontestan.createKontestan
);
router.get("/elections", kontestan.findKontestanWithElections);

router.get(
  "/service-period",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await KontestanPeriodModel.query().select(
        "id",
        "service_name",
        "duration"
      );
      success(res, "get all kontestan service", 200, service);
      return;
    } catch (error) {
      next(error);
    }
  }
);

router
  .route("/:id")
  .get(kontestan.findByIdKontestan)
  .put(
    uploadImage("./uploads/kontestan/").single("file"),
    kontestan.updateKontestan
  )
  .delete(kontestan.deleteKontestanById);

export { router as kontestanRouter };
