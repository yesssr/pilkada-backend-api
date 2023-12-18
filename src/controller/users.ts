import { Request, Response, NextFunction } from "express";
import { UsersService } from "../service/users.services";
import { createToken, success } from "../utils/utils";
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
      const id = req.params.id;
      const data: UsersModel = req.body;
      data.id = id;
      const user = await UsersService.update(data);
      success(res, "success updated user", 200, user);
      return;
    } catch (error) {
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
