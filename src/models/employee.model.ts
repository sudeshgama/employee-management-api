import { Task } from "./task.model";

export interface Employee {
  id: string;
  name?: string;
  email: string
  password?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
  tasks?: Task[]
}