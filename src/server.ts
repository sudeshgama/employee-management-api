import express from "express";
import morgan from 'morgan';
import router from "./router";
import { protect } from "./modules/auth";

const app = express();

// middleware
app.use(morgan('dev'));

// protect will protect all the routes from being accessed from outside
app.use('/api', protect, router)

export default app;