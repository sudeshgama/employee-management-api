import { NextFunction, Response } from "express";
import prisma from "../../db";
import { AuthenticationRequest } from "../../models/auth.model";

export const getAllEmployees = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {
    const employees = await prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        position: true,
        department: true,
        phone: true,
        role: true
      }
    });
    res.json({ data: employees })
  } catch (e) {
    next(e)
  }
}
