import { NextFunction, Response } from "express";
import { AuthenticationRequest } from "../../models/auth.model";
import { EmployeeRoles } from "../../constants/employee-roles";
import { sendResponse } from "../../utils/helper-functions";
import { ErrorMessages } from "../../constants/error-messages";
import { HttpStatusCode } from "../../constants/status-codes";
import prisma from "../../db";

export const deleteEmployee = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {
    //check if user is admin if not return unauthorized
    if (req.employee.role !== EmployeeRoles.ADMIN) {
      sendResponse(res, ErrorMessages.UNAUTHORIZED, HttpStatusCode.FORBIDDEN);
      return;
    }

    await prisma.employee.delete({
      where: {
        id: req.employee.id
      }
    });

    res.json({
      data: {
        id: req.employee.id,
      }
    });

  } catch (e) {
    next(e);
  }
}