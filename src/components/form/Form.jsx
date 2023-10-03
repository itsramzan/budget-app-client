import React from "react";
import { FormProvider } from "react-hook-form";

const Form = ({ methods, onSubmit, children }) => {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((credendials) => onSubmit(credendials))}
        noValidate
        className="w-full rounded-md space-y-4"
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
