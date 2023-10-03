import React from "react";
import { IoArrowUpOutline } from "react-icons/io5";

const ScrollTop = () => {
  return (
    <button
      className="btn btn-sm btn-square btn-primary fixed bottom-4 right-2 z-50 cursor-pointer"
      onClick={() => scrollTo(0, 0)}
      title="Back to top"
    >
      <IoArrowUpOutline />
    </button>
  );
};

export default ScrollTop;
