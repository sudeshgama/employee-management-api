import jwt from 'jsonwebtoken';
import { Employee } from '../models/user.model';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

export interface AuthenticationRequest extends Request {
  employee: Employee;
}

export const createJwt = (employee: Employee): string => {
  const token = jwt.sign({ id: employee.id, email: employee.email }, process.env.JWT_SECRET);
  return token;
}

export const protect = (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  // if no bearer token return
  if (!bearer) {
    res.status(401);
    res.send({ message: 'Not Authorized' });
    return;
  }

  // if no token in the bearer return
  const [, token] = bearer.split(' ');
  if (!token) {
    res.status(401);
    res.send({ message: 'Not a valid token' });
    return;
  }

  // if there is token verify the token 
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.employee = payload;
    next();
    return;
  } catch (e) {
    res.status(401);
    res.send({ message: 'Not a valid token' });
    return;
  }
}

export const comparePasswords = (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
}

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5);
}