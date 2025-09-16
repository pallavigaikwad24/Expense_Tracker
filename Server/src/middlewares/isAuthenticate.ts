import type { Request, Response, NextFunction } from "express";
import { httpCodes } from "../enum/httpCodes.js";

export async function isAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.query;

  console.log("Token in isAuthenticate middleware:", token);

  if (!token) {
    return res
      .status(httpCodes.FORBIDDEN.code)
      .json({ message: "Unauthorized: No token provided" });
  }
  next();
}
