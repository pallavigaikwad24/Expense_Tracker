import type { Request, Response } from "express";
import { Expense } from "../../models/Expense.js";
import { User } from "../../models/User.js";

export const addExpenseController = async (req: Request, res: Response) => {
  try {
    const { owner, date, amount, category } = req.body;
    const userID = await User.findOne({ email: owner }).select("_id");
    if (!userID) {
      return res.status(404).json({ message: "User not found" });
    }
    const result = await Expense.create({
      owner: userID,
      date,
      amount,
      category,
    });
    return res.status(200).json({ data: result });
  } catch (error: any) {
    if(error.status == 503) {
      return res.status(503).json({ message: "Service Unavailable. Please try again later." });
    }
    console.log("Error in expenseAllController:", error);
    return res.status(500).json({ message: "Error in expenseAllController" });
  }
};
