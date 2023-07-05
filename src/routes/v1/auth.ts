import { Router } from "express";
import { authController } from "../../middleware/auth";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

export { router as authRouter };
