import React from "react";
import { useFormContext } from "react-hook-form";
import { nanoid } from "nanoid";
import Label from "./Label";
import Error from "./Error";

const Textarea = (props) => {
  const { name, label, ...rest } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const uniqueId = `${name}-${nanoid()}`;

  return (
    <div className="w-full flex flex-col gap-2">
      <Label {...{ name: uniqueId, label }} />

      <textarea
        id={uniqueId}
        spellCheck="false"
        placeholder={label}
        {...register(name)}
        {...rest}
        className="textarea textarea-sm textarea-primary bg-transparent w-full"
      ></textarea>

      <Error error={errors[name]?.message} />
    </div>
  );
};

export default Textarea;
