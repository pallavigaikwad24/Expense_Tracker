import type { Request, Response } from "express";
import { Expense } from "../../models/Expense.js";

export const expenseAllController = async (req: Request, res: Response) => {
  try {
    const result = await Expense.find();
    return res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error in expenseAllController:", error);
    return res.status(500).json({ message: "Error in expenseAllController" });
  }
};
