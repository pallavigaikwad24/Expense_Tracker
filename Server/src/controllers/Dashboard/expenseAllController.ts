import type { Request, Response } from "express";
import { Expense } from "../../models/Expense.js";
import { User } from "../../models/User.js";

export const expenseAllController = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const { month } = req.query;
    console.log("Month from query:", month);
    const userID = await User.findOne({ email });

    if (!userID) {
      return res.status(404).json({ message: "User not found" });
    }

    let query: any = { owner: userID._id };

    const monthNumber = Number(month);
    if (monthNumber != 0) {
      query = {
        $expr: {
          $and: [
            { $eq: ["$owner", userID._id] },
            { $eq: [{ $month: "$date" }, monthNumber] },
          ],
        },
      };
    }

    const result = await Expense.find(query).sort({
      createdAt: -1,
    });

    return res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error in expenseAllController:", error);
    return res.status(500).json({ message: "Error in expenseAllController" });
  }
};
