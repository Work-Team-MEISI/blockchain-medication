import { body } from "express-validator";

export const SignInValidator = [
    body("email").notEmpty().isEmail(),
    body("password").notEmpty().isString(),
]