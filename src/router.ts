import { Router } from "express";
import { getAllEmployees } from "./handlers/employees/get-all-employees";
import { updateEmployee } from "./handlers/employees/update-employee";
import { deleteEmployee } from "./handlers/employees/delete-employee";
import { getAllTasks } from "./handlers/task/get-all-tasks";
import { createTask } from "./handlers/task/create-task";
import { updateTask } from "./handlers/task/update-task";
import { deleteTask } from "./handlers/task/delete-task";

const router: Router = Router();

// remove employee
router.delete('/employees/:id', deleteEmployee);
// update employee
router.put('/employees/:id', updateEmployee);
// get all employees
router.get('/employees', getAllEmployees);

// add tasks
router.get('/tasks', getAllTasks);
// remove tasks
router.delete('/tasks/:id', deleteTask);
// update tasks
router.put('/tasks/:id', updateTask);
// get all tasks
router.post('/tasks', createTask);

export default router;
