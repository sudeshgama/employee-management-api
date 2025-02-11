import { NextFunction, Response } from "express";
import { AuthenticationRequest } from "../../models/auth.model";
import prisma from "../../db";

export const deleteTask = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {
    const deletedTask = await prisma.task.delete({
      where: {
        id: req.params.id
      }
    })
    res.json({
      data: deletedTask,
      message: 'Task Deleted Successfully'
    })
  } catch (e) {
    next(e);
  }
}