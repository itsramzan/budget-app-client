import React, { useState, useEffect } from "react";
import { StringParam, useQueryParams } from "use-query-params";

const Search = () => {
  const [query, setQuery] = useQueryParams({ search: StringParam });
  const { search } = query;
  const [searchInput, setSearchInput] = useState(search || "");

  // Track search query for undefined -> searchInput reset to ""
  useEffect(() => {
    if (!search) {
      setSearchInput("");
    }
  }, [search]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setQuery({ search: searchInput || undefined });
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchInput]);

  return (
    <div className="space-y-2">
      <p className="text-primary font-semibold">Search by content</p>
      <input
        type="text"
        placeholder="Search here..."
        spellCheck="false"
        autoComplete="off"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full input input-sm input-primary"
      />
    </div>
  );
};

export default Search;
