import { Router } from "express";
import { users } from "../../controller/users";
import { uploadImage } from "../../helper/multer";

const router = Router();

router.get("/", users.findAllUsers);
router.get("/kontestan-not-linked", users.findKontestanNotLink);
router.get("/profile", users.getUserProfile);
router
  .route("/:id")
  .get(users.findByIdUser)
  .put(uploadImage("./uploads/users/").single("file"), users.updateUser)
  .delete(users.deleteUserById);

export { router as usersRouter };
