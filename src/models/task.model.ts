import { Employee } from "./employee.model";

export interface Task {
  id: string; // UUID for the task
  title: string; // Title of the task
  description?: string; // Optional description of the task
  status: string; // Status of the task (e.g., "pending", "in-progress", "completed")
  createdAt: Date; // Timestamp when the task was created
  updatedAt: Date; // Timestamp when the task was last updated
  employeeId: string; // Foreign key referencing the employee who created the task
  employee: Employee; // Relationship to the Employee model
}