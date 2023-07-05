import { Router } from "express";
import { authController } from "../../middleware/auth";
import { errorHandler } from "../../middleware/error";
import { kontestanRouter } from "./kontestan";
import { usersRouter } from "./users";
import { rolesRouter } from "./roles";
import { authRouter } from "./auth";

const router = Router();

router.use("/auth", authRouter);
router.use(authController.auth);
router.use("/users", usersRouter);
router.use("/roles", rolesRouter);
router.use("/kontestan", kontestanRouter);
router.use(errorHandler);

export default router;
