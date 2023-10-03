import React from "react";
import { useFormContext } from "react-hook-form";
import { nanoid } from "nanoid";
import Label from "./Label";
import Error from "./Error";

const Input = (props) => {
  const { name, label, type, ...rest } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const uniqueId = `${name}-${nanoid()}`;

  return (
    <div className="w-full flex flex-col gap-2">
      <Label {...{ name: uniqueId, label }} />

      <input
        id={uniqueId}
        type={type}
        spellCheck="false"
        placeholder={label}
        {...register(name)}
        {...rest}
        className="input input-sm input-bordered input-primary bg-transparent w-full"
      />

      <Error error={errors[name]?.message} />
    </div>
  );
};

export default Input;
