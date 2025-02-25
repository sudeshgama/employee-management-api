import { NextFunction, Response } from "express";
import { AuthenticationRequest } from "../../models/auth.model";
import prisma from "../../db";
import { sendResponse } from "../../utils/helper-functions";
import { ErrorMessages } from "../../constants/error-messages";
import { HttpStatusCode } from "../../constants/status-codes";

export const createTask = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: req.employee.id
      }
    });

    if (!employee) {
      sendResponse(res, ErrorMessages.INVALID_TOKEN, HttpStatusCode.FORBIDDEN);
      return;
    }

    const task = await prisma.task.create({
      data: {
        description: req.body.description,
        title: req.body.title,
        status: req.body.status,
        employeeId: req.employee.id
      }
    });

    res.json({
      data: task,
      message: 'Task create successfully'
    });
  } catch (e) {
    next(e);
  }
}