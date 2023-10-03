import React from "react";
import { useQueryParams } from "use-query-params";
import { IoTrashBinOutline } from "react-icons/io5";

const QueryReset = () => {
  const [_, setQuery] = useQueryParams({});

  const handleFilterReset = () => {
    setQuery({ page: 1, search: undefined, type: undefined, sort: undefined });
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleFilterReset}
        className="btn btn-sm btn-primary flex items-center gap-2"
      >
        <IoTrashBinOutline className="pointer-events-none" /> Query Reset
      </button>
    </div>
  );
};

export default QueryReset;
