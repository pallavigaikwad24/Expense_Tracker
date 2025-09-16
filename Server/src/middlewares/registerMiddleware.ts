// validations/registerValidation.ts
import { body, type ValidationChain } from "express-validator";
import { User } from "../models/User.js";
import { cryptoDecryptionFun } from "../utils/cryptionFun.js";

export const registerValidation: ValidationChain[] = [
  body("first_name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (value) => {
      const existEmail = await User.findOne({ email: value });
      if (existEmail) {
        throw new Error("Email already in use!");
      }
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom((value) => {
      const plainText = cryptoDecryptionFun(value);
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!regex.test(plainText)) {
        throw new Error(
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
      }

      return true;
    }),
];
