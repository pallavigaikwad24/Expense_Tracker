"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  CalendarIcon,
  TagIcon,
  CurrencyDollarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { axiosInstance } from "@/utils/axiosInstance";

interface ExpenseFormProps {
  setIsOpen: (isOpen: boolean) => void;
}

interface ExpenseFormInputs {
  date: string;
  category: string;
  amount: number;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormInputs>();

  const onSubmit: SubmitHandler<ExpenseFormInputs> = async (data) => {
    await axiosInstance(false).post("/api/addExpense", {...data, owner: localStorage.getItem("email")});
    reset(); // clear after submit
    setIsOpen(false);
  };

  return (
    <div className="absolute top-20  max-w-md mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 mt-12 border border-gray-100">
      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        type="button"
        className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>

      {/* Heading */}
      <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        Add New Expense
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Date */}
        <div>
          <label className=" text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-indigo-500" /> Date
          </label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full px-4 py-3 border rounded-xl shadow-sm bg-white focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all hover:border-indigo-300"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className=" text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <TagIcon className="w-5 h-5 text-pink-500" /> Category
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-3 border rounded-xl shadow-sm bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all hover:border-pink-300"
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className=" text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <CurrencyDollarIcon className="w-5 h-5 text-green-500" /> Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter amount"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 1, message: "Amount must be greater than 0" },
            })}
            className="w-full px-4 py-3 border rounded-xl shadow-sm bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all hover:border-green-300"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-5 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
          💾 Save Expense
        </button>
      </form>
    </div>
  );
};
