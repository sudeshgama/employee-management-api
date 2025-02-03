import { Request } from "express";
import { Employee } from "./employee.model";

export interface AuthenticationRequest extends Request {
  employee: Employee;
}