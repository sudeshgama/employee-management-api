import { NextFunction, Response } from "express";
import prisma from "../db";
import { AuthenticationRequest } from "../models/auth.model";
import { comparePasswords, createJwt, hashPassword } from "../modules/auth";

export const createEmployee = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {
    if (Object.entries(req.body).length === 0) {
      res.status(400);
      res.send({ message: 'Bad Request' });
      return;
    }

    if (req.body.name === undefined ||
      req.body.email === undefined ||
      req.body.password === undefined ||
      req.body.role === undefined
    ) {
      res.status(400);
      res.send({ message: 'Bad Request One or more property missing in the payload' });
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
    res.json({ message: 'You have signed up successfully' });
  } catch (e) {
    next(e);
  }
}

export const signIn = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {

    if (Object.entries(req.body).length === 0 || Object.entries(req.body).length > 2) {
      res.status(400);
      res.send({ message: 'Bad Request' });
      return;
    }

    const employee = await prisma.employee.findUnique({
      where: { email: req.body.email }
    });

    const isValid = comparePasswords(req.body.password, employee.password);

    if (!isValid) {
      res.status(401);
      res.send("Invalid username or Password");
      return;
    }

    const token = createJwt(employee);
    res.json({ token: token, email: employee.email, role: employee.role });
  } catch (e) {
    next(e)
  }
}