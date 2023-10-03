import React from "react";

const Heading = ({ text, children }) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-primary text-xl font-semibold">{text}</p>
      {children}
    </div>
  );
};

export default Heading;
