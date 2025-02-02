import { NextFunction, Response } from "express";
import { AuthenticationRequest } from "../../models/auth.model";
import prisma from "../../db";
import { SuccessMessages } from "../../constants/success-messages";

export const updateEmployee = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {
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
    console.log(employee, 'emp');
    res.json({
      data: {
        name: employee.name,
        department: employee.department,
        email: employee.email,
        phone: employee.phone
      }, message: SuccessMessages.UPDATE_SUCCESS
    })
  } catch (e) {
    next(e);
  }
}