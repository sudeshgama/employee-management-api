Employee Management API
License

The Employee Management API is a RESTful API built with NestJS and Prisma to manage employees and their tasks. It provides endpoints for creating, reading, updating, and deleting employees and tasks, as well as querying tasks assigned to specific employees.

Features
Employee Management:

Create, read, update, and delete employees.

Assign tasks to employees.

Task Management:

Create, read, update, and delete tasks.

Filter tasks by employee ID.

Database:

Uses Prisma as the ORM for database operations.

Supports PostgreSQL (or any other database supported by Prisma).

RESTful API:

Follows REST principles for clean and predictable endpoints.

Technologies Used
NestJS: A progressive Node.js framework for building efficient and scalable server-side applications.

Prisma: A modern ORM for database access and management.

PostgreSQL: A powerful, open-source relational database system.

TypeScript: A typed superset of JavaScript for better developer productivity.

Swagger: API documentation and testing.

Getting Started
Prerequisites
Node.js (v16 or higher)

npm or yarn

PostgreSQL (or any other database supported by Prisma)

Git

Installation
Clone the repository:

bash
Copy
git clone https://github.com/sudeshgama/employee-management-api.git
cd employee-management-api
Install dependencies:

bash
Copy
npm install
Set up the database:

Create a PostgreSQL database.

Update the .env file with your database credentials:

env
Copy
DATABASE_URL="postgresql://user:password@localhost:5432/employee_management"
Run Prisma migrations:

bash
Copy
npx prisma migrate dev --name init
Seed the database (optional):

bash
Copy
npx prisma db seed
Start the server:

bash
Copy
npm run start:dev
The API will be available at http://localhost:3000.

API Documentation
The API documentation is automatically generated using Swagger. After starting the server, you can access the documentation at:

Copy
http://localhost:3000/api
Example Endpoints
Employees
GET /employees: Get all employees.

GET /employees/:id : Get an employee by ID.

POST /employees: Create a new employee.

PUT /employees/:id : Update an employee by ID.

DELETE /employees/:id : Delete an employee by ID.

Tasks
GET /tasks: Get all tasks.

GET /tasks/:id : Get a task by ID.

POST /tasks: Create a new task.

PUT /tasks/:id : Update a task by ID.

DELETE /tasks/:id : Delete a task by ID.

GET /tasks/employee/:employeeId : Get all tasks for a specific employee.

Database Schema
Employee
Field	Type	Description
id	String	Unique identifier (UUID).
name	String	Employee's full name.
createdAt	DateTime	Timestamp of creation.
updatedAt	DateTime	Timestamp of last update.
Task
Field	Type	Description
id	String	Unique identifier (UUID).
title	String	Task title.
description	String?	Task description (optional).
status	String	Task status (e.g., "pending", "completed").
createdAt	DateTime	Timestamp of creation.
updatedAt	DateTime	Timestamp of last update.
employeeId	String	ID of the employee assigned to the task.
Environment Variables
The following environment variables are required:

Variable	Description	Example
DATABASE_URL	Connection URL for the database.	postgresql://user:password@localhost:5432/employee_management
PORT	Port on which the server will run.	3000
Running Tests
To run the unit tests, use the following command:

bash
Copy
npm run test
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/YourFeatureName).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/YourFeatureName).

Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
NestJS for providing a robust framework for building APIs.

Prisma for simplifying database access and management.

PostgreSQL for being a reliable and scalable database solution.

Contact
For questions or feedback, please contact:

Sudesh Gama

GitHub: sudeshgama

Email: sudeshgama@example.com

