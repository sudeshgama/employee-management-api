import { Router } from "express";
import { getAllEmployees } from "./handlers/employees/get-all-employees";
import { updateEmployee } from "./handlers/employees/update-employee";
import { deleteEmployee } from "./handlers/employees/delete-employee";

const router: Router = Router();

// remove employee
router.delete('/employees/:id', deleteEmployee);
// update employee
router.put('/employees/:id', updateEmployee);
// get all employees
router.get('/employees', getAllEmployees);
//login
router.post('/auth/login', (res, req, next) => { });


// add tasks
router.post('/tasks', (res, req, next) => { });
// remove tasks
router.delete('/tasks/:id', (res, req, next) => { });
// update tasks
router.put('/tasks/:id', (res, req, next) => { });
// get all tasks
router.get('/tasks', (res, req, next) => { });

export default router;
