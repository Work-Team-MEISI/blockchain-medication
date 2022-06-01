import { body } from "express-validator";

export const SignUpValidator = [
    body("email").notEmpty().isEmail(),
    body("username").notEmpty().isString(),
    body("password").notEmpty().isString(),
    body("firstName").notEmpty().isString(),
    body("lastName").notEmpty().isString(),
]