import React from "react";
import { IoCardOutline, IoWalletOutline, IoCashOutline } from "react-icons/io5";

const Stat = ({ stat }) => {
  const { totalIncome, totalExpense, totalSaving } = stat;

  const data = [
    {
      id: 1,
      text: "Income",
      value: totalIncome,
      Icon: IoCardOutline,
    },
    {
      id: 2,
      text: "Expense",
      value: totalExpense,
      Icon: IoWalletOutline,
    },
    {
      id: 3,
      text: "Saving",
      value: totalSaving,
      Icon: IoCashOutline,
    },
  ];

  return (
    <div className="flex flex-wrap items-start gap-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex-grow flex flex-col gap-2 bg-base-300 bg-opacity-50 p-4 rounded-md"
        >
          <div className="flex items-center gap-2 text-primary font-semibold">
            {<item.Icon className="text-2xl" />}
            <p>{item.text}</p>
          </div>
          <p>{item.value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Stat;
