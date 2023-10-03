import React from "react";
import Input from "./Input";
import Password from "./Password";
import Textarea from "./Textarea";
import Select from "./Select";
import RadioButtons from "./RadioButtons";
import CheckboxGroup from "./CheckboxGroup";
import File from "./File";
import OTP from "./OTP";

const FormControl = (props) => {
  switch (props.control) {
    case "input":
      return <Input {...props} />;

    case "password":
      return <Password {...props} />;

    case "textarea":
      return <Textarea {...props} />;

    case "select":
      return <Select {...props} />;

    case "radio":
      return <RadioButtons {...props} />;

    case "checkbox":
      return <CheckboxGroup {...props} />;

    case "file":
      return <File {...props} />;

    case "otp":
      return <OTP {...props} />;

    default:
      return null;
  }
};

export default FormControl;
