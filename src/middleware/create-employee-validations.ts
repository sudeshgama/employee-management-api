import { body } from "express-validator";

export const validateCreateEmployee = [
  // Validate email
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),

  // Name validation  
  body('name')
    .notEmpty()
    .withMessage('Full Name is required')
    .isString()
    .withMessage('Enter only alphabets from A to Z or a to z'),

  // Validate password
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['admin', 'user'])
    .withMessage('Role must be either "admin" or "user"'),

  body('position')
    .notEmpty()
    .withMessage('Position is required')
    .isString()
    .withMessage('Enter only alphabets from A to Z or a to z'),

  body('department')
    .notEmpty()
    .withMessage('Department is required')
    .isString()
    .withMessage('Enter only alphabets from A to Z or a to z'),

  body('phone')
    .notEmpty()
    .withMessage('Department is required')
    .isNumeric()
    .withMessage('Enter only numeric values from 0 to 9'),
]  
