import React from "react";
import { useFormContext } from "react-hook-form";
import { nanoid } from "nanoid";
import Label from "./Label";
import Error from "./Error";

const CheckboxGroup = (props) => {
  const { name, label, type, options, ...rest } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full flex flex-col gap-2">
      <Label {...{ name, label }} />

      <div className="flex items-center gap-4">
        {options.map((option) => {
          const uniqueId = `${option}-${nanoid()}`;

          return (
            <div key={option} className="flex items-center gap-2">
              <input
                id={uniqueId}
                type="checkbox"
                {...register(name)}
                {...rest}
                value={option}
                className="checkbox checkbox-xs checkbox-primary"
              />
              <label htmlFor={uniqueId} className="text-sm cursor-pointer">
                {option}
              </label>
            </div>
          );
        })}
      </div>

      <Error error={errors[name]?.message} />
    </div>
  );
};

export default CheckboxGroup;
