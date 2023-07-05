import { Router } from "express";
import { users } from "../../controller/users";

const router = Router();

router.get("/", users.findAllUsers);
router
  .route("/:id")
  .get(users.findByIdUser)
  .put(users.updateUser)
  .delete(users.deleteUserById);

export { router as usersRouter };
