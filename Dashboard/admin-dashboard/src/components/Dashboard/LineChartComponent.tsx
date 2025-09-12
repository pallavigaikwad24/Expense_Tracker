import { DateData } from "@/utils/typeDefinition/typeFile";
import React from "react";
import {
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  dateData: DateData[];
}

const LineChartComponent: React.FC<LineChartProps> = ({ dateData }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 lg:col-span-2">
      <h2 className="text-xl font-semibold mb-4">Spending Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        {dateData.length > 0 ? (
          <LineChart data={dateData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </LineChart>
        ) : (
          <div className="w-[200%] flex items-center justify-center p-8 text-gray-500">
            <p className="text-lg font-medium">No data found</p>
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
