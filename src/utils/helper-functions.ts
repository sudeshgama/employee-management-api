import { Response } from 'express';
export const sendResponse = (res: Response, message: string, code: number) => {
  res.status(code);
  res.send({ message });
}