import { NextFunction, Response } from "express";
import { AuthenticationRequest } from "../../models/auth.model";
import prisma from "../../db";
import { SuccessMessages } from "../../constants/success-messages";
import { sendResponse } from "../../utils/helper-functions";
import { ErrorMessages } from "../../constants/error-messages";
import { HttpStatusCode } from "../../constants/status-codes";
import { EmployeeRoles } from "../../constants/employee-roles";

export const updateEmployee = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {

    console.log(req.employee.role);
    //check if user is admin if not return unauthorized
    if (req.employee.role !== EmployeeRoles.ADMIN) {
      sendResponse(res, ErrorMessages.UNAUTHORIZED, HttpStatusCode.FORBIDDEN);
      return;
    }

    const employee = await prisma.employee.update({
      where: {
        id: req.params.id
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        department: req.body.department
      }
    });
    const { name, department, email, phone } = employee;
    res.json({
      data: { name, department, email, phone },
      message: SuccessMessages.UPDATE_SUCCESS
    })
  } catch (e) {
    next(e);
  }
}