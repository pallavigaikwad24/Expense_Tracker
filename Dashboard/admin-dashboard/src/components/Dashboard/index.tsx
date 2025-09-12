import {
  CategoryData,
  DateData,
  ExpenseData,
} from "@/utils/typeDefinition/typeFile";
import React, { useEffect, useState } from "react";
import PieChartComponent from "./PieChartComponent";
import LineChartComponent from "./LineChartComponent";
import { ExpenseForm } from "../Form";
import { axiosInstance } from "@/utils/axiosInstance";

import { SparklesIcon } from "@heroicons/react/24/outline";

import Papa from "papaparse";
import { useRouter } from "next-nprogress-bar";
import ChatbotUI from "../ChatBot";
import ExpenseTable from "./ExpenseTable";

const ExpensesDashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chatView, setChatView] = useState<boolean>(false);
  const router = useRouter();

  // Group by category for PieChart

  const categoryData: CategoryData[] = Object.values(
    expenses.reduce<Record<string, CategoryData>>((acc, exp) => {
      acc[exp.category] = acc[exp.category] || { name: exp.category, value: 0 };
      acc[exp.category].value += exp.amount;
      return acc;
    }, {})
  );

  // Group by date for LineChart
  const dateData: DateData[] = Object.values(
    expenses.reduce<Record<string, DateData>>((acc, exp) => {
      acc[exp.date.split("T")[0]] = acc[exp.date.split("T")[0]] || {
        date: exp.date.split("T")[0],
        amount: 0,
      };
      acc[exp.date.split("T")[0]].amount += exp.amount;
      return acc;
    }, {})
  );

  function downloadCSV() {
    if (!expenses || expenses.length === 0) return;

    const csvData = expenses.map(({ _id, owner, __v, ...rest }) => rest);

    // Convert JSON → CSV string
    const csv = Papa.unparse(csvData);

    // Create a Blob and temporary link
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const today = new Date();
    const filename = `expense-${today.toISOString().split("T")[0]}`;

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }

  function fetchExpenses() {
    axiosInstance(false)
      .get("/api/expenseall")
      .then((result) => setExpenses(result.data.data.data))
      .catch((error) => console.log("error 45:", error));
  }

  function handleLogout() {
    axiosInstance(false)
      .post("/api/logout")
      .then(() => {
        router.push("/login");
      })
      .catch((error) => console.log("Logout error:", error));
  }

  useEffect(() => {
    fetchExpenses();
  }, [isOpen, chatView]);

  return (
    <>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <h1 className="right-0 text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent col-span-1 lg:col-span-2">
          Expense Tracker Dashboard
        </h1>
        <div className="w-[200%] flex justify-between">
          <button
            onClick={downloadCSV}
            className="cursor-pointer px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/50 transition-all col-span-1 lg:col-span-2 "
          >
            Download CSV
          </button>
          <div>
            {/* AI Button */}
            <button
              onClick={() => setChatView(true)}
              className=" mr-2 cursor-pointer px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/50 transition-all col-span-1 lg:col-span-2 "
            >
              <SparklesIcon className="w-6 h-6 inline-block " /> Ask AI
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className=" cursor-pointer mr-2 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/50 transition-all col-span-1 lg:col-span-2 "
            >
              + Add Expense
            </button>
            <button
              onClick={() => handleLogout()}
              className="cursor-pointer px-6 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-indigo-500/50 transition-all col-span-1 lg:col-span-2 "
            >
              Logout
            </button>
          </div>
        </div>
        {/* Expenses Table */}
        <div className=" shadow-md rounded-2xl p-4 col-span-1 lg:col-span-2">
          <ExpenseTable expenses={expenses} />
        </div>

        {/* Pie Chart */}
        <PieChartComponent categoryData={categoryData} />

        {/* Line Chart */}
        <LineChartComponent dateData={dateData} />
      </div>

      {/* Expense Form */}

      {isOpen && (
        <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center transition-opacity">
          <ExpenseForm setIsOpen={setIsOpen} />
        </div>
      )}

      {/* Chat Bot */}
      {chatView && (
        <div className="bg-black/60 fixed inset-0 z-50 flex items-center justify-center transition-opacity">
          <ChatbotUI setChatView={setChatView} />
        </div>
      )}
    </>
  );
};

export default ExpensesDashboard;
