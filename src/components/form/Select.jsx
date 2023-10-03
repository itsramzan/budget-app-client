import React from "react";
import { useFormContext } from "react-hook-form";
import { nanoid } from "nanoid";
import Label from "./Label";
import Error from "./Error";

const Select = (props) => {
  const { name, label, options, ...rest } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const uniqueId = `${name}-${nanoid()}`;

  return (
    <div className="w-full flex flex-col gap-2">
      <Label {...{ name: uniqueId, label }} />

      <select
        id={uniqueId}
        {...register(name)}
        {...rest}
        className="select select-sm select-primary bg-transparent w-full"
      >
        <option value="">Select gender</option>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <Error error={errors[name]?.message} />
    </div>
  );
};

export default Select;
