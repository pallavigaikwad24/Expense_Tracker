import React from "react";
import {
  CurrencyDollarIcon,
  CalendarIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { ExpenseData } from "@/utils/typeDefinition/typeFile";

function ExpenseTable({ expenses }: Readonly<{ expenses: ExpenseData[] }>) {
  type Category = "Food" | "Bill" | "Travel" | "Other";

  const getCategoryColor = (category: string): string => {
    const colors: Record<Category, string> = {
      Food: "bg-orange-100 text-orange-800",
      Bill: "bg-blue-100 text-blue-800",
      Travel: "bg-purple-100 text-purple-800",
      Other: "bg-pink-100 text-pink-800",
    };

    // Narrow unknown string to valid Category type
    if (category in colors) {
      return colors[category as Category];
    }

    return "bg-gray-100 text-gray-800"; // default color
  };

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Date</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <TagIcon className="h-4 w-4" />
                    <span>Category</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2 text-sm font-semibold text-gray-700">
                    <CurrencyDollarIcon className="h-4 w-4" />
                    <span>Amount</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {expenses.length > 0 ? (
                expenses.map((exp, index) => (
                  <tr
                    key={exp._id}
                    className="hover:bg-gradient-to-r hover:from-blue-25 hover:to-purple-25 transition-all duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(exp.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(exp.date).toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                          exp.category
                        )}`}
                      >
                        {exp.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-lg font-bold text-gray-900">
                        ${exp.amount.toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="bg-gray-100 p-4 rounded-full">
                        <CurrencyDollarIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="text-lg font-medium text-gray-500">
                        No expenses found
                      </div>
                      <div className="text-sm text-gray-400">
                        Start tracking your expenses to see them here
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      {expenses.length > 0 && (
        <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">
              Total Expenses
            </span>
            <span className="text-xl font-bold text-gray-900">
              ${expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseTable;
