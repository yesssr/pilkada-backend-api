import { Request, Response, NextFunction } from "express";
import { UserTokenService } from "../service/user_tokens.services";
import { success } from "../utils/utils";
import { localError } from "../middleware/error";

const controller = {
  findAllTokens: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokens = await UserTokenService.getAllToken();
      success(res, "find all token", 200, tokens);
      return;
    } catch (error) {
      next(error);
    }
  },

  findTokensByStatus: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const status = req.params.status;
      const tokens = await UserTokenService.getAllToken(status);
      success(res, "find all token", 200, tokens);
      return;
    } catch (error) {
      next(error);
    }
  },

  findByIdToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const token = await UserTokenService.getByTokenId(id);
      if (!token) {
        let err = new localError();
        err.message = "token not found";
        err.statusCode = 404;
        throw err;
      }
      success(res, "find token by id", 200, token);
      return;
    } catch (error) {
      next(error);
    }
  },

  generateToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const total = req.body.total;
      const token = await UserTokenService.generateToken(total);
      success(res, "token successfully created", 201, token);
      return;
    } catch (error) {
      next(error);
    }
  },

  deleteTokenById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const token = await UserTokenService.deleteById(id);
      success(res, "success delete token", 200, token);
      return;
    } catch (error) {
      next(error);
    }
  },
};

export { controller as token };
