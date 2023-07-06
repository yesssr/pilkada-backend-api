import { Router } from "express";
import { authController } from "../../middleware/auth";
import { errorHandler } from "../../middleware/error";
import { kontestanRouter } from "./kontestan";
import { regionRouter } from "./region";
import { usersRouter } from "./users";
import { rolesRouter } from "./roles";
import { authRouter } from "./auth";
import { tpsRouter } from "./tps";

const router = Router();

router.use("/auth", authRouter);
router.use(authController.auth);
router.use("/users", usersRouter);
router.use("/roles", rolesRouter);
router.use("/tps", tpsRouter);
router.use("/region", regionRouter);
router.use("/kontestan", kontestanRouter);
router.use(errorHandler);

export default router;
