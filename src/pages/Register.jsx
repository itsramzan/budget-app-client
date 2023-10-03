import React from "react";
import { useForm } from "react-hook-form";
import { registerResolver } from "../validations/auth.validation";
import Form from "../components/form/Form";
import FormHeading from "../components/form/FormHeading";
import FormControl from "../components/form/FormControl";
import FormLink from "../components/form/FormLink";
import FormButton from "../components/form/FormButton";
import { useRegisterMutation } from "../features/auth/authApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const methods = useForm({ resolver: registerResolver });
  const { getValues, setError } = methods;

  const [register, { isLoading }] = useRegisterMutation();

  const navigate = useNavigate();

  const onSubmit = async (credentials) => {
    try {
      await register(credentials).unwrap();
      toast.success("Kindly verify your OTP");
      navigate("/verify-email", { state: { email: getValues("email") } });
    } catch (err) {
      const errors = err?.data?.error?.errors;
      if (errors) {
        for (let error in errors) {
          setError(error, { type: "manual", message: errors[error].msg });
        }
      }
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full md:w-5/12">
        <Form {...{ methods, onSubmit }}>
          <FormHeading text="Register Form" subText="It's easy & free" />
          <FormControl
            control="input"
            label="Enter your username"
            type="text"
            name="username"
          />
          <FormControl
            control="input"
            label="Enter your email"
            type="email"
            name="email"
          />
          <FormControl
            control="password"
            label="Enter your password"
            name="password"
          />
          <FormLink to="/login" text="Already have an account?" />
          <FormButton
            isSubmitting={isLoading}
            text={isLoading ? "Registering" : "Register"}
          />
        </Form>
      </div>
    </div>
  );
};

export default Register;
