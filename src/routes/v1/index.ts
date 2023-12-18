import { Router } from "express";
import { authController } from "../../middleware/auth";
import { errorHandler } from "../../middleware/error";
import { kontestanRouter } from "./kontestan";
import { electionsRouter } from "./elections";
import { regionRouter } from "./region";
import { tokenRouter } from "./token";
import { usersRouter } from "./users";
import { rolesRouter } from "./roles";
import { authRouter } from "./auth";
import { tpsRouter } from "./tps";
import { findAllBearers } from "../../controller/bearers";

const router = Router();

router.use("/auth", authRouter);
router.get("/bearers", findAllBearers);
router.use(authController.auth);
router.use("/users", usersRouter);
router.use("/token", tokenRouter);
router.use("/roles", rolesRouter);
router.use("/tps", tpsRouter);
router.use("/region", regionRouter);
router.use("/kontestan", kontestanRouter);
router.use("/elections", electionsRouter);
router.use(errorHandler);

export default router;
