// validations/registerValidation.ts
import { body } from "express-validator";
import { User } from "../models/User.js";
import { cryptoDecryptionFun, decryptionFun } from "../utils/cryptionFun.js";

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
      const password = cryptoDecryptionFun(value);
      const existEmail = await User.findOne({ email: req.body.email });
      const isPassword = decryptionFun(
        existEmail?.password as string,
        password
      );
      if (!isPassword) {
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
    .custom((value, { req }) => {
      const plainText = cryptoDecryptionFun(value);
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!regex.test(plainText)) {
        throw new Error(
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
      }
    }),
];
