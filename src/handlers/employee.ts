import { NextFunction, Response } from "express";
import prisma from "../db";
import { AuthenticationRequest } from "../models/auth.model";
import { comparePasswords, createJwt, hashPassword } from "../modules/auth";
import { HttpStatusCode } from "../constants/status-codes";
import { ErrorMessages } from "../constants/error-messages";
import { sendResponse } from "../utils/helper-functions";
import { validationResult } from "express-validator";
import { SuccessMessages } from "../constants/success-messages";

export const createEmployee = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {
    if (Object.entries(req.body).length === 0) {
      sendResponse(res, ErrorMessages.MISSING_PROPERTY, HttpStatusCode.BAD_REQUEST);
      return;
    }

    if (req.body.name === undefined ||
      req.body.email === undefined ||
      req.body.password === undefined ||
      req.body.role === undefined
    ) {
      sendResponse(res, ErrorMessages.MISSING_PROPERTY, HttpStatusCode.BAD_REQUEST);
      return;
    }

    const employee = await prisma.employee.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password),
        role: req.body.role
      }
    })
    const token = createJwt(employee);
    res.json({ message: SuccessMessages.SIGNUP_SUCCESS });
  } catch (e) {
    next(e);
  }
}

export const signIn = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
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

export const getAllEmployees = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {
    const employees = await prisma.employee.findMany({
      select: {
        name: true,
        email: true
      }
    });
    res.json({ data: employees })
  } catch (e) {
    next(e)
  }
}

