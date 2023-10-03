import React from "react";

const Error = ({ error }) => {
  return (
    <div>
      <p>{error || "Something went wrong"}</p>
    </div>
  );
};

export default Error;
