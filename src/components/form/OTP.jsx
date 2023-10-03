import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { nanoid } from "nanoid";
import Label from "./Label";
import OtpInput from "react-otp-input";
import Error from "./Error";

const OTP = (props) => {
  const { name, label, type, ...rest } = props;
  const { formState, setValue, getValues } = useFormContext();
  const { errors, isSubmitted } = formState;
  const uniqueId = `${name}-${nanoid()}`;

  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(getValues(name));
  }, [getValues(name)]);

  const onChange = (value) => {
    setValue(name, value, { shouldValidate: isSubmitted });
    setInput(value);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <Label {...{ name: uniqueId + "0", label }} />

      <OtpInput
        value={input}
        id={uniqueId}
        inputType={type}
        onChange={onChange}
        numInputs={6}
        renderInput={(props, index) => {
          return (
            <input
              id={uniqueId + index}
              {...props}
              {...rest}
              className="input input-primary input-sm bg-transparent flex-1"
            />
          );
        }}
        containerStyle="gap-4"
      />

      <Error error={errors[name]?.message} />
    </div>
  );
};

export default OTP;
