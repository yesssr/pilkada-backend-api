import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { comparePass, createToken, success, verifyToken } from "../utils/utils";
import { AuthService } from "../service/auth.services";
import { UsersService } from "../service/users";
import { localError } from "./error";

const controller = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = uuidv4();
      const data = req.body;
      data.id = id;
      const user = await UsersService.save(data);
      success(res, "user succesfully registered", 201, user);
      return;
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const find = await AuthService.getByUsersCredentials(email);
      if (!find) {
        let err = new localError();
        err.statusCode = 404;
        err.message = "email not registered !";

        throw err;
      }
      const isMatch = await comparePass(password!, find.password!);
      if (!isMatch) {
        let err = new localError();
        err.statusCode = 401;
        err.message = "wrong password !";

        throw err;
      }
      find.password = undefined;
      const payload = {
        id: find.id,
        email: find.email,
        role_id: find.role_id,
        role: find.role,
      };
      const token = createToken(payload);
      success(res, "login berhasil !", 200, find, ...[,], token);
      return;
    } catch (error) {
      next(error);
    }
  },

  auth: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization?.split(" ")[1];
      if (!authorization) {
        let err = new localError();
        err.statusCode = 401;
        err.message = "invalid credentials !";

        throw err;
      }
      const payload = verifyToken(authorization);
      req.app.locals.credentials = payload;
      console.log(payload);
      next();
      return;
    } catch (error) {
      next(error);
    }
  },
};

export { controller as authController };