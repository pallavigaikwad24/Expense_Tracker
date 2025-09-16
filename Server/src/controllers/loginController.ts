import type { Request, Response } from "express";
import { User } from "../models/User.js";
import { httpCodes } from "../enum/httpCodes.js";
import { cryptoDecryptionFun, encryptionFun } from "../utils/cryptionFun.js";

export async function registerController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { first_name, email, password } = req.body;
    const plainText = cryptoDecryptionFun(password);
    const encryptPassword = encryptionFun(plainText);
    const result = await User.create({
      name: first_name,
      email,
      password: encryptPassword,
      createAt: new Date(),
    });

    return res
      .status(httpCodes.OK.code)
      .json({ data: result, message: httpCodes.OK.message });
  } catch (error) {
    console.log("Error creating user:", error);
    return res
      .status(httpCodes.INTERNAL_SERVER_ERROR.code)
      .json({ message: "Error creating user" });
  }
}

export async function loginController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { email } = req.body;
    const result = await User.findOne({ email });

    return res
      .status(httpCodes.OK.code)
      .json({ data: result, message: httpCodes.OK.message });
  } catch (error) {
    console.log("Error creating user:", error);
    return res
      .status(httpCodes.INTERNAL_SERVER_ERROR.code)
      .json({ message: "Error creating user" });
  }
}

export async function forgotPasswordController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const updatePassword = await User.findOneAndUpdate(
      { email },
      { password: encryptionFun(password) },
      { new: true }
    );

    if (!updatePassword) {
      return res
        .status(httpCodes.NOT_FOUND.code)
        .json({ message: "User not found" });
    }
    return res
      .status(httpCodes.OK.code)
      .json({ message: "Password updated successfully", data: updatePassword });
  } catch (error) {
    console.log("Error in forgot password:", error);
    return res
      .status(httpCodes.INTERNAL_SERVER_ERROR.code)
      .json({ message: "Error in forgot password" });
  }
}

export async function logoutController(req: Request, res: Response) {
  try {
    res.clearCookie("token");
    return res
      .status(httpCodes.OK.code)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error while logout:", error);
    return res
      .status(httpCodes.INTERNAL_SERVER_ERROR.code)
      .json({ message: "Error while logout" });
  }
}
