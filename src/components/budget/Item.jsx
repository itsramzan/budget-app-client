import React from "react";
import { IoBriefcaseOutline, IoCalendarOutline } from "react-icons/io5";
import { BiMessageSquareEdit, BiMessageSquareX } from "react-icons/bi";
import moment from "moment";

const Item = ({ item, setSelectedItem }) => {
  const { title, type, amount, updatedAt } = item || {};

  return (
    <div className="bg-base-300 bg-opacity-50 p-4 rounded-md space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="flex-1 text-primary font-bold line-clamp-1">{title}</p>

        <div className="flex items-center gap-2 cursor-pointer">
          <label
            htmlFor="update-budget-modal"
            onClick={() => setSelectedItem(item)}
            className="cursor-pointer"
          >
            <BiMessageSquareEdit
              className="text-lg text-success"
              title="Edit"
            />
          </label>
          <label
            htmlFor="delete-budget-modal"
            onClick={() => setSelectedItem(item)}
            className="cursor-pointer"
          >
            <BiMessageSquareX className="text-lg text-error" title="Delete" />
          </label>
        </div>
      </div>

      <p className="line-clamp-1">{amount.toLocaleString()}</p>
      <div className="flex items-center justify-between">
        <p className="text-xs flex items-center gap-2 capitalize">
          <IoBriefcaseOutline />
          {type}
        </p>
        <p className="text-xs flex items-center gap-2">
          <IoCalendarOutline />
          {moment(updatedAt).calendar()}
        </p>
      </div>
    </div>
  );
};

export default Item;
