import multer from "multer";
import { SendError } from "../middleware/error";
import { getUniqueNumber } from "../utils/utils";

const multerDir = (directory: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, directory);
    },

    filename: function (req: any, file: any, cb: any) {
      const fileName =
        file.originalname +
        "-" +
        req.app.locals.credentials.id +
        "-" +
        getUniqueNumber();
      file.originalname = fileName;
      console.log(file.originalname);
      cb(null, file.originalname);
    },
  });

  return storage;
};
const fileFilter = (req: any, file: any, cb: any) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(file.originalname);

  if (extname) {
    cb(null, true);
  } else {
    cb(
      new SendError("Image uploaded is not of type jpg/jpeg or png", 400),
      false
    );
  }
};

export function uploadImage(directory: string) {
  const upload = multer({
    storage: multerDir(directory),
    fileFilter: fileFilter,
    limits: { fileSize: 5000000 },
  });
  return upload;
}
