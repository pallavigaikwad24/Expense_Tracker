import { Router } from "express";
import {
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
} from "../controllers/loginController.js";
import { registerValidation } from "../middlewares/registerMiddleware.js";
import {
  forgotEmailValidation,
  forgotPasswordValidation,
  loginValidation,
} from "../middlewares/loginMiddleware.js";
import { validationResultFun } from "../utils/validation.js";
import { authToken } from "../middlewares/authToken.js";
const router = Router();

import { isAuthenticate } from "../middlewares/isAuthenticate.js";

router.post(
  "/register",
  registerValidation,
  validationResultFun,
  authToken,
  registerController
);

router.post(
  "/login",
  loginValidation,
  validationResultFun,
  authToken,
  loginController
);

router.post(
  "/forgotpassword",
  forgotEmailValidation,
  validationResultFun,
  loginController
);

router.post(
  "/forgotpasswordchange",
  forgotPasswordValidation,
  validationResultFun,
  forgotPasswordController
);

router.post("/logout", isAuthenticate, logoutController);

export default router;
