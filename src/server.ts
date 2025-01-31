import express from "express";
import morgan from 'morgan';
import router from "./router";
import { protect } from "./modules/auth";
import { createEmployee } from "./handlers/employee";

const app = express();
// to make sure we want to get request object in json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middleware
app.use(morgan('dev'));


// protect will protect all the routes from being accessed from outside
app.use('/api', protect, router);

// create employee 
app.post('/employee', createEmployee);

export default app;