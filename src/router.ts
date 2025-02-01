import { Router } from "express";
import { getAllEmployees } from "./handlers/employee";

const router: Router = Router();

// add employee
router.post('/employees', (req, res, next) => {

});
// remove employee
router.delete('/employees/:id', (res, req, next) => { });
// update employee
router.put('/employees/:id', (res, req, next) => { });
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
