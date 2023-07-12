import { NextFunction, Request, Response } from "express";
import { comparePass, createToken, success, verifyToken } from "../utils/utils";
import { UserTokenService } from "../service/user_tokens.services";
import { UsersService } from "../service/users.services";
import { AuthService } from "../service/auth.services";
import { localError } from "./error";

const controller = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, bearer_id, phone, role_id, password, token } =
        req.body;
      const data = {
        email,
        bearer_id,
        name,
        phone,
        role_id,
        password,
      };
      let checkToken = await UserTokenService.checkStatusToken(token);
      if (!checkToken) {
        let err = new localError();
        err.message = "token not registered !";
        err.statusCode = 400;
        throw err;
      }
      if (checkToken?.status !== "available") {
        let err = new localError();
        err.message = "token already used !";
        err.statusCode = 400;
        throw err;
      }
      const user = await UsersService.save(data);
      const user_token = await UserTokenService.addUserIdToToken(
        user.id,
        token
      );
      success(res, "user succesfully registered", 201, user_token);
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
      delete find.password;
      const payload = {
        id: find.id,
        bearer_id: find.bearer_id,
        email: find.email,
        role_id: find.role_id,
        role: find.role,
        slug: find.slug,
      };
      // console.log(payload);
      const token = createToken(payload);
      success(res, "login successfully !", 200, find, ...[,], token);
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
      next();
      return;
    } catch (error) {
      next(error);
    }
  },
};

export { controller as authController };
