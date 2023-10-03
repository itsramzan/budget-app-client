import React, { useEffect, useState } from "react";
import { useQueryParams, ArrayParam } from "use-query-params";
import sortOptions from "../../data/sortOptions";

const Sort = () => {
  const [queryParams, setQueryParams] = useQueryParams({ sort: ArrayParam });
  const { sort } = queryParams;

  const [sortObj, setSortObj] = useState(() => {
    if (!sort) return {};
    return sort.reduce((obj, item) => {
      const field = item.startsWith("-") ? item.slice(1) : item;
      return { ...obj, [field]: item.startsWith("-") ? "desc" : "asc" };
    }, {});
  });

  useEffect(() => {
    const sortArray = Object.entries(sortObj).map(([field, direction]) =>
      direction === "asc" ? field : `-${field}`
    );
    setQueryParams({ sort: sortArray });
  }, [sortObj]);

  const handleSelection = (field, direction) => {
    if (direction === "") {
      const { [field]: _, ...updatedSortObj } = sortObj;
      setSortObj(updatedSortObj);
    } else {
      setSortObj((prevSortObj) => ({ ...prevSortObj, [field]: direction }));
    }
  };

  return (
    <>
      {sortOptions.map(({ id, field }) => {
        const activeDirection = sortObj[field] || "";
        return (
          <div key={id} className="space-y-2">
            <p className="text-primary font-semibold">Sort by {field}</p>
            <div className="flex items-center gap-4">
              {["", "asc", "desc"].map((direction) => (
                <button
                  key={direction || "Default"}
                  onClick={() => handleSelection(field, direction)}
                  className={`btn btn-xs ${
                    activeDirection === direction ? "btn-primary" : ""
                  }`}
                >
                  {direction || "Default"}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Sort;
