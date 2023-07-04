import { Router } from "express";
import { authController } from "../../middleware/auth";
import { errorHandler } from "../../middleware/error";
import { usersRouter } from "./users";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.use(authController.auth);
router.use("/users", usersRouter);
router.use(errorHandler);

export default router;
