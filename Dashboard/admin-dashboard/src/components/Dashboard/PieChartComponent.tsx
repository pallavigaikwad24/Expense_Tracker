import { CategoryData } from "@/utils/typeDefinition/typeFile";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface PieChartProps {
  categoryData: CategoryData[];
}

const PieChartComponent: React.FC<PieChartProps> = ({ categoryData }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 col-span-1 lg:col-span-2">
      <h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        {categoryData.length > 0 ? (
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey={"name"}
              label={
                ({ name, percent = 0 }) =>
                  `${name} ${(percent * 100).toFixed(0)}%` // Percent calculated using current slice value / total value
              }
            >
              {categoryData.map((_, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]} // Cycle through colors
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <div className="w-[200%] flex items-center justify-center p-8 text-gray-500">
            <p className="text-lg font-medium">No data found</p>
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
