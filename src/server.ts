import express from "express";
import morgan from 'morgan';
import router from "./router";
import { protect } from "./modules/auth";
import { validateSignIn } from "./middleware/signin-validations";
import { validateCreateEmployee } from "./middleware/create-employee-validations";
import { createEmployee } from "./handlers/employees/create-employee";
import { signIn } from "./handlers/auth/sign-in";
const cors = require('cors');

const app = express();
// to make sure we want to get request object in json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(morgan('dev'));

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies and credentials
}));

// protect will protect all the routes from being accessed from outside
app.use('/api', protect, router);

// create employee 
app.post('/employee', validateCreateEmployee, createEmployee);
// signin
app.post('/signIn', validateSignIn, signIn)

export default app;