import React from "react";
import { useQueryParams, StringParam } from "use-query-params";

const FilterType = () => {
  const [query, setQuery] = useQueryParams({ type: StringParam });
  const { type } = query;

  const data = [
    {
      id: 1,
      text: "All",
      type: undefined,
    },
    {
      id: 2,
      text: "Income",
      type: "income",
    },
    {
      id: 3,
      text: "Expense",
      type: "expense",
    },
  ];

  const handleSetQuery = (givenType) => {
    if (givenType === type) return;
    setQuery({ type: givenType });
  };

  return (
    <div className="space-y-2">
      <p className="text-primary font-semibold">Filter by type</p>
      <div className="flex items-center gap-4">
        {data.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSetQuery(item.type)}
            className={`btn btn-xs ${type === item.type && "btn-primary"}`}
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterType;
