import { NextFunction, Response } from "express";
import { AuthenticationRequest } from "../../models/auth.model";
import prisma from "../../db";
import { sendResponse } from "../../utils/helper-functions";
import { ErrorMessages } from "../../constants/error-messages";
import { HttpStatusCode } from "../../constants/status-codes";

export const getAllTasks = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!employee) {
      sendResponse(res, ErrorMessages.INVALID_TOKEN, HttpStatusCode.FORBIDDEN);
      return;
    }

    const tasks = await prisma.task.findMany({
      where: {
        employeeId: employee.id
      }
    });

    res.json({
      data: {
        tasks
      }
    })
  } catch (e) {
    next(e)
  }
}