import { Router } from "express";
import { getAllEmployees } from "./handlers/employees/get-all-employees";
import { updateEmployee } from "./handlers/employees/update-employee";
import { deleteEmployee } from "./handlers/employees/delete-employee";
import { getAllTasks } from "./handlers/task/get-all-tasks";
import { createTask } from "./handlers/task/create-task";

const router: Router = Router();

// remove employee
router.delete('/employees/:id', deleteEmployee);
// update employee
router.put('/employees/:id', updateEmployee);
// get all employees
router.get('/employees', getAllEmployees);

// add tasks
router.get('/tasks/:id', getAllTasks);
// remove tasks
router.delete('/tasks/:id', (res, req, next) => { });
// update tasks
router.put('/tasks/:id', (res, req, next) => { });
// get all tasks
router.post('/task/:id', createTask);

export default router;
