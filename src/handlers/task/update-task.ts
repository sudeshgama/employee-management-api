import { NextFunction, Response } from "express";
import { AuthenticationRequest } from "../../models/auth.model";
import prisma from "../../db";
import { sendResponse } from "../../utils/helper-functions";
import { ErrorMessages } from "../../constants/error-messages";
import { HttpStatusCode } from "../../constants/status-codes";

export const updateTask = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {

    const task = await prisma.task.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!task) {
      sendResponse(res, ErrorMessages.INVALID_TOKEN, HttpStatusCode.FORBIDDEN);
      return;
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: req.params.id
      },
      data: {
        status: req.body.status,
        title: req.body.title,
        description: req.body.description
      }
    });

    res.json({
      data: updatedTask,
      message: 'Task Updated Successfully'
    })
  } catch (e) {
    next(e);
  }
}