import { Router } from "express";
import { users } from "../../controller/users";

const router = Router();

router.get("/", users.findAllUsers);

export { router as usersRouter };
