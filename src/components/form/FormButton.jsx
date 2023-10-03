import React from "react";

const FormButton = ({ text, isSubmitting, ...rest }) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      {...rest}
      className="w-full btn btn-sm btn-primary"
    >
      {text}
    </button>
  );
};

export default FormButton;
