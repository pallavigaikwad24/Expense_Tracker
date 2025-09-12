import { validationResult } from "express-validator";
import { httpCodes } from "../enum/httpCodes.js";
import type { NextFunction, Request, Response } from "express";

export function validationResultFun(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(httpCodes.FORBIDDEN.code).send({ error: result.array() });
  }
  next();
}
