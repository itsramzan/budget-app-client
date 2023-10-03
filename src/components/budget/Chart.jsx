import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import themes from "daisyui/src/theming/themes";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ stat }) => {
  const theme = useSelector((state) => state.theme.theme);
  const colors = themes[`[data-theme=${theme}]`];

  const { totalIncome, totalExpense, totalSaving } = stat;

  const data = {
    labels: ["Income", "Expense", "Saving"],
    datasets: [
      {
        label: "Budget stat",
        data: [totalIncome, totalExpense, totalSaving],
        backgroundColor: [colors.primary, colors.secondary, colors.accent],
        borderColor: "transparent",
      },
    ],
  };

  return (
    <div className="bg-base-300 bg-opacity-50 p-4 rounded-md space-y-2">
      <Pie data={data} />
    </div>
  );
};

export default Chart;
