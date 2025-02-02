import { NextFunction, Response } from "express";
import { AuthenticationRequest } from "../../models/auth.model";
import { validationResult } from "express-validator";
import { HttpStatusCode } from "../../constants/status-codes";
import prisma from "../../db";
import { hashPassword } from "../../modules/auth";
import { SuccessMessages } from "../../constants/success-messages";

export const createEmployee = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    await prisma.employee.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password),
        role: req.body.role,
        department: req.body.department,
        position: req.body.position,
        phone: req.body.phone
      }
    })
    res.json({ message: SuccessMessages.SIGNUP_SUCCESS });
  } catch (e) {
    next(e);
  }
}