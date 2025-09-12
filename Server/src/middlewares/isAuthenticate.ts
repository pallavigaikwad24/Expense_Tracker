import type { Request, Response, NextFunction } from "express";
import { httpCodes } from "../enum/httpCodes.js";

export async function isAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = res.clearCookie;
  if (!token) {
    return res.status(httpCodes.FORBIDDEN.code).json({ message: "Unauthorized: No token provided" });
  }
  next();
}
