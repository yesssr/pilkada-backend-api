import { Request, Response, NextFunction } from "express";
import { RoleService } from "../service/roles.services";
import { success } from "../utils/utils";
import { SendError } from "../middleware/error";
import { RoleModel } from "../model/roles";

const controller = {
  findAllRoles: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = await RoleService.getAllRoles();
      success(res, "find all roles", 200, roles);
      return;
    } catch (error) {
      next(error);
    }
  },

  findRoleById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const role = await RoleService.getByRoleId(id);
      if (!role) {
        let err = new SendError();
        err.message = "role not found";
        err.statusCode = 404;
      }
      success(res, "find role by id", 200, role);
      return;
    } catch (error) {
      next(error);
    }
  },

  createRole: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: RoleModel = req.body;
      const role = await RoleService.save(data);
      success(res, "role successfully created", 201, role);
      return;
    } catch (error) {
      next(error);
    }
  },

  updateRole: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data: RoleModel = req.body;
      data.id = id;
      const role = await RoleService.update(data);
      success(res, "role successfully updated", 200, role);
      return;
    } catch (error) {
      next(error);
    }
  },

  deleteRoleById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const role = await RoleService.deleteById(id);
      success(res, "role successfully deleted", 200, role);
      return;
    } catch (error) {
      next(error);
    }
  },
};

export { controller as roles };
