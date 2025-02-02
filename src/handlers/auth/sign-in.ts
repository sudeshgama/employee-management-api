import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorMessages } from "../../constants/error-messages";
import { HttpStatusCode } from "../../constants/status-codes";
import prisma from "../../db";
import { AuthenticationRequest } from "../../models/auth.model";
import { comparePasswords, createJwt } from "../../modules/auth";
import { sendResponse } from "../../utils/helper-functions";

export const signIn = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }


    const employee = await prisma.employee.findUnique({
      where: { email: req.body.email }
    });

    if (!employee) {
      sendResponse(res, ErrorMessages.INVALID_USER, HttpStatusCode.BAD_REQUEST);
      return;
    }

    const isValid = await comparePasswords(req.body.password, employee.password);

    if (!isValid) {
      sendResponse(res, ErrorMessages.INVALID_USER, HttpStatusCode.BAD_REQUEST);
      return;
    }

    const token = createJwt(employee);

    res.json({
      token,
      email: employee.email,
      role: employee.role
    });

  } catch (e) {
    next(e)
  }
}