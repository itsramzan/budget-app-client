import React from "react";
import { Link } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";

const NotFound = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-2xl space-y-4 text-center">
        <p className="text-5xl text-primary font-bold">Opps!</p>
        <p>Something went wrong</p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 btn btn-primary rounded-md"
          >
            <IoExitOutline /> Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
