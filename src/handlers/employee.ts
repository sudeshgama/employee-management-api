import { NextFunction, Response } from "express";
import prisma from "../db";
import { AuthenticationRequest } from "../models/auth.model";
import { createJwt } from "../modules/auth";

export const createEmployee = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {
    if (Object.entries(req.body).length === 0) {
      res.status(400);
      res.send({ message: 'Bad Request' });
      return;
    }
    const employee = await prisma.employee.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      }
    })
    const token = createJwt(employee);
    res.json({ token });
  } catch (e) {
    next(e);
  }
}