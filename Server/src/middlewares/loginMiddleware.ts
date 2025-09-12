// validations/registerValidation.ts
import { body } from "express-validator";
import { User } from "../models/User.js";

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .custom(async (value) => {
      const existEmail = await User.findOne({ email: value });
      if (!existEmail) {
        throw new Error("Email does not exist, please register first");
      }
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (value, { req }) => {
      const existEmail = await User.findOne({ email: req.body.email });
      if (existEmail?.password !== value) {
        throw new Error("Invalid password!");
      }
    }),
];

export const forgotEmailValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .custom(async (value) => {
      const existEmail = await User.findOne({ email: value });
      if (!existEmail) {
        throw new Error("Email does not exist, please register first");
      }
    }),
];
export const forgotPasswordValidation = [
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character"),
  body("confirm_password")
    .notEmpty()
    .withMessage("Confirm Password is required"),
];
