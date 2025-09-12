import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { serialize } from "cookie";

dotenv.config();

export function authToken(req: Request, res: Response, next: NextFunction) {
  try {
    const SECRET_KEY = process.env.SECRET_KEY;
    const { email } = req.body;

    // Create JWT token
    const token = jwt.sign({ email }, SECRET_KEY as string, {
      expiresIn: "2h",
    });

    // set token in httpOnly cookie
    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 2 * 60 * 60, // 2 hours in seconds
        sameSite: "lax",
      })
    );

    next();
  } catch (error) {
    console.log("Error in authToken middleware:", error);
  }
}
