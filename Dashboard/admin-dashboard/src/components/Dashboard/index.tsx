import {
  CategoryData,
  DateData,
  ExpenseData,
  Option,
} from "@/utils/typeDefinition/typeFile";
import React, { useEffect, useRef, useState } from "react";
import PieChartComponent from "./PieChartComponent";
import LineChartComponent from "./LineChartComponent";
import { ExpenseForm } from "../Form";
import { axiosInstance } from "@/utils/axiosInstance";

import { SparklesIcon } from "@heroicons/react/24/outline";

import Papa from "papaparse";
import { useRouter } from "next-nprogress-bar";
import ChatbotUI from "../ChatBot";
import ExpenseTable from "./ExpenseTable";
import { DropDownComponent } from "./DropDownComponent";

const ExpensesDashboard: React.FC = () => {
  const router = useRouter();
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chatView, setChatView] = useState<boolean>(false);

  // Month List
  const options: Option[] = [
    { id: "0", label: "Search by month" },
    { id: "1", label: "January" },
    { id: "2", label: "February" },
    { id: "3", label: "March" },
    { id: "4", label: "April" },
    { id: "5", label: "May" },
    { id: "6", label: "June" },
    { id: "7", label: "July" },
    { id: "8", label: "August" },
    { id: "9", label: "September" },
    { id: "10", label: "October" },
    { id: "11", label: "November" },
    { id: "12", label: "December" },
  ];

  const [selectedItem, setSelectedItem] = useState(options[0]);
  // Year List
  const [yearOptions, setYearOptions] = useState<Option[]>([{ id: "0", label: "Search by year" }]);
  const [selectedItemYear, setSelectedItemYear] = useState(yearOptions[0]);

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

  function fetchExpenses(month: string, year: string) {
    const email = localStorage.getItem("email");
    axiosInstance(false)
      .post(`/api/expenseall`, { email, month, year })
      .then((result) => setExpenses(result.data.data.data))
      .catch((error) => console.log("error 45:", error));
  }

  function handleLogout() {
    axiosInstance(false)
      .post("/api/logout")
      .then(() => {
        localStorage.removeItem("email");
        router.push("/login");
      })
      .catch((error) => console.log("Logout error:", error));
  }

  useEffect(() => {
      const yearArr = Array.from(
        new Set(expenses.map((expense) => new Date(expense.date).getFullYear()))
      );

      const years = yearArr.map((year, index) => ({
        id: (index + 1).toString(),
        label: year.toString(),
      }));

      const yearList = [{ id: "0", label: "Search by year" }, ...years];
      setYearOptions(yearList);
  }, [expenses]);

  useEffect(() => {
    fetchExpenses("", "");
    setSelectedItem({ id: "0", label: "Search by month" });
    setSelectedItemYear({ id: "0", label: "Search by year" });
  }, [isOpen, chatView]);

  useEffect(() => {
    if (
      selectedItem.label === "Search by month" &&
      selectedItemYear.label === "Search by year"
    ) {
      fetchExpenses("", "");
    } else {
      fetchExpenses(selectedItem.id, selectedItemYear.label);
    }
  }, [selectedItem, selectedItemYear]);

  return (
    <>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <h1 className="right-0 text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent col-span-1 lg:col-span-2">
          Expense Tracker Dashboard
        </h1>
        <div className="w-[200%] flex justify-between">
          <div className="flex w-[100%] gap-2">
            {/* Download CSV Button */}
            <button
              onClick={downloadCSV}
              className="ml-3 cursor-pointer px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/50 transition-all  "
            >
              Download CSV
            </button>

            <div className="w-[37%]">
              <DropDownComponent
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                options={options}
              />
            </div>
            <div className="w-[37%]">
              <DropDownComponent
                selectedItem={selectedItemYear}
                setSelectedItem={setSelectedItemYear}
                options={yearOptions}
              />
            </div>
          </div>
          <div className="flex justify-end w-[100%] gap-2">
            {/* AI Button */}
            <button
              onClick={() => setChatView(true)}
              className="cursor-pointer px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/50 transition-all  "
            >
              <SparklesIcon className="w-6 h-6 inline-block " /> Ask AI
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className=" cursor-pointer px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/50 transition-all  "
            >
              + Add Expense
            </button>
            <button
              onClick={() => handleLogout()}
              className="cursor-pointer px-6 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-indigo-500/50 transition-all "
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
