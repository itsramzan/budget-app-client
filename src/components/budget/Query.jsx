import React from "react";
import { IoFilterOutline } from "react-icons/io5";
import Search from "./Search";
import Filter from "./Filter";
import Sort from "./Sort";
import QueryReset from "./QueryReset";

const Query = () => {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <label tabIndex={0} title="Filter" className="btn btn-xs btn-primary">
        <IoFilterOutline />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content bg-base-100 ring-1 ring-primary ring-opacity-20 p-4 mt-2 w-64 md:w-96 rounded-md space-y-4"
      >
        <Search />
        <Filter />
        <Sort />
        <QueryReset />
      </div>
    </div>
  );
};

export default Query;
