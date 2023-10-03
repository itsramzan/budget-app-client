import React from "react";
import RcPagination from "rc-pagination";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

const Pagination = ({ total, pageSize, current, onChange }) => {
  return (
    <div className="flex justify-end items-center">
      <RcPagination
        defaultCurrent={current}
        total={total}
        current={current}
        pageSize={pageSize}
        locale="en-US"
        onChange={onChange}
        showLessItems={true}
        itemRender={(page, type, element) => {
          if (type === "prev") {
            return <IoArrowBackOutline />;
          }
          if (type === "next") {
            return <IoArrowForwardOutline />;
          }
          if (type === "page") {
            return <span>{page}</span>;
          }
          return element;
        }}
      />
    </div>
  );
};

export default Pagination;
