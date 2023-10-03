import React from "react";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";

const NavToggle = ({ show, setShow }) => {
  return (
    <label className="swap swap-rotate md:hidden">
      <input
        type="checkbox"
        checked={show}
        onChange={() => setShow((show) => !show)}
      />
      <IoCloseOutline className="swap-on fill-current w-6 h-6" />
      <IoMenuOutline className="swap-off fill-current w-6 h-6" />
    </label>
  );
};

export default NavToggle;
