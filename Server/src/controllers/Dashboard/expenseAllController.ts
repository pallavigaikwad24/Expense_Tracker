import type { Request, Response } from "express";
import { Expense } from "../../models/Expense.js";
import { User } from "../../models/User.js";

export const expenseAllController = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const { month, year } = req.query;
    const userID = await User.findOne({ email });

    if (!userID) {
      return res.status(404).json({ message: "User not found" });
    }
    const monthNumber = Number(month);
    const yearNumber = Number(year);

    const query = {
      $expr: {
        $and: [
          { $eq: ["$owner", userID._id] },
          ...(monthNumber != 0
            ? [{ $eq: [{ $month: "$date" }, monthNumber] }]
            : []),
          ...(yearNumber ? [{ $eq: [{ $year: "$date" }, yearNumber] }] : []),
        ],
      },
    };

    const result = await Expense.find(query).sort({
      createdAt: -1,
    });

    return res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error in expenseAllController:", error);
    return res.status(500).json({ message: "Error in expenseAllController" });
  }
};
