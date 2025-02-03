import jwt from 'jsonwebtoken';
import { Employee } from '../models/employee.model';
import { Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { AuthenticationRequest } from '../models/auth.model';
import { sendResponse } from '../utils/helper-functions';
import { ErrorMessages } from '../constants/error-messages';
import { HttpStatusCode } from '../constants/status-codes';

export const createJwt = (employee: Employee): string => {
  const token = jwt.sign({ id: employee.id, email: employee.email, role: employee.role }, process.env.JWT_SECRET);
  return token;
}

export const protect = (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  // if no bearer token return
  if (!bearer) {
    sendResponse(res, ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
    return;
  }

  // if no token in the bearer return
  const [, token] = bearer.split(' ');
  if (!token) {
    sendResponse(res, ErrorMessages.INVALID_TOKEN, HttpStatusCode.UNAUTHORIZED);
    return;
  }

  // if there is token verify the token 
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.employee = payload;
    next();
    return;
  } catch (e) {
    sendResponse(res, ErrorMessages.INVALID_TOKEN, HttpStatusCode.UNAUTHORIZED);
    return;
  }
}

export const comparePasswords = (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
}

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5);
}