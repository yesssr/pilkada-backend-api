import { Router } from "express";
import { token } from "../../controller/user_tokens";

const router = Router();

router.get("/", token.findAllTokens);
router.get("/:status/status", token.findTokensByStatus);
router.post("/generate", token.generateToken);

router
  .route("/:id")
  .get(token.findByIdToken)
  .delete(token.deleteTokenById);

export { router as tokenRouter };