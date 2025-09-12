import { Document, model, type ObjectId, Schema } from "mongoose";

interface IExpense extends Document {
  owner: ObjectId;
  date: Date;
  category: string;
  amount: number;
}

const ExpenseSchema = new Schema<IExpense>({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date },
  category: { type: String, required: true },
  amount: { type: Number },
});

export const Expense = model<IExpense>("Expense", ExpenseSchema, "expenses");
