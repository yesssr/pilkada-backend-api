import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";

import { UsersService } from "../service/users.services";
import { comparePass, createToken, success } from "../utils/utils";
import { SendError } from "../middleware/error";
import { UsersModel } from "../model/users";

const controller = {
  findAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UsersService.getAllUsers();
      success(res, "find all users", 200, users);
      return;
    } catch (error) {
      next(error);
    }
  },

  findByIdUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const user = await UsersService.getByIdUser(id);
      if (!user) {
        let err = new SendError();
        err.message = "user not found";
        err.statusCode = 404;
        throw err;
      }
      success(res, "find user by id", 200, user);
      return;
    } catch (error) {
      next(error);
    }
  },

  getUserProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.app.locals.credentials.id;
      const user = await UsersService.getByIdUser(id);
      if (!user) {
        let err = new SendError();
        err.message = "user not found";
        err.statusCode = 404;
        throw err;
      }
      const payload = {
        id: user.id,
        bearer_id: user.bearer_id,
        email: user.email,
        role_id: user.role_id,
        role: user.role,
        slug: user.slug,
      };
      // console.log(payload);
      const token = createToken(payload);
      success(res, "find user by id", 200, user, ...[,], token);
      return;
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credentials = req.app.locals.credentials;
      const image = req.file;
      const data = req.body;
      let checkUser = await UsersService.getByIdUser(credentials.id);

      const isMatch = await comparePass(data.password!, checkUser?.password!);
      if (!isMatch) {
        let err = new SendError();
        err.statusCode = 400;
        err.message = "wrong password !";
        throw err;
      }

      if (data.new_pass && data.conf_new_pass) {
        console.log(data.new_pass);
        if (data.new_pass != data.conf_new_pass) {
          throw new SendError("New Pass is not match with Confirm Pass", 400);
        }
        data.password = data.conf_new_pass;
        // console.log(data.password);
      }

      if (!image && !data.photo) throw new SendError("photo is required", 400);

      if (image && data.photo != "default.png") {
        let filename = path.join(
          __dirname,
          `../../uploads/users/${data.photo}`
        );

        fs.unlink(filename, (err) => {
          if (err) {
            console.log(err);
            throw new SendError("Error processing file", 501);
          }
        });
      }

      if (image) data.photo = image?.originalname;

      data.id = credentials.id;
      data.role_id = `${credentials.role_id}`;
      data.bearer_id = credentials.bearer_id;
      console.log(data);

      delete data.new_pass;
      delete data.conf_new_pass;

      const users = await UsersService.update(data);
      success(res, "success updated users", 200, users);
      return;
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const user = await UsersService.delete(id);
      success(res, "success delete user", 200, user);
      return;
    } catch (error) {
      next(error);
    }
  },

  findKontestanNotLink: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bearer_id = req.app.locals.credentials.bearer_id;

      const kontestans = await UsersService.getkontestanNotLink(bearer_id);
      success(res, "find kontestan not linked", 200, kontestans);
      return;
    } catch (error) {
      next(error);
    }
  },
};

export { controller as users };
