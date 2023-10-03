import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { nanoid } from "nanoid";
import Label from "./Label";
import Error from "./Error";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Password = (props) => {
  const { name, label, type, ...rest } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const uniqueId = `${name}-${nanoid()}`;

  const [visibility, setVisibility] = useState(false);

  const handleVisivility = (e) => {
    e.preventDefault();
    setVisibility(!visibility);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <Label {...{ name: uniqueId, label }} />

      <div className="flex items-center gap-2">
        <input
          id={uniqueId}
          type={visibility ? "text" : "password"}
          spellCheck="false"
          placeholder={label}
          {...register(name)}
          {...rest}
          className="input input-sm input-bordered input-primary bg-transparent w-full"
        />
        {visibility ? (
          <IoEyeOutline
            onClick={handleVisivility}
            className="text-xl text-base-100 bg-primary h-8 w-8 p-2 rounded-md cursor-pointer"
          />
        ) : (
          <IoEyeOffOutline
            onClick={handleVisivility}
            className="text-xl text-base-100 bg-primary h-8 w-8 p-2 rounded-md cursor-pointer"
          />
        )}
      </div>

      <Error error={errors[name]?.message} />
    </div>
  );
};

export default Password;
