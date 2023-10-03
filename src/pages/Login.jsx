import React from "react";
import { useForm } from "react-hook-form";
import { loginResolver } from "../validations/auth.validation";
import Form from "../components/form/Form";
import FormHeading from "../components/form/FormHeading";
import FormControl from "../components/form/FormControl";
import FormLink from "../components/form/FormLink";
import FormButton from "../components/form/FormButton";
import { useLoginMutation } from "../features/auth/authApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const methods = useForm({ resolver: loginResolver });

  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  const onSubmit = async (credentials) => {
    try {
      const res = await login(credentials).unwrap();
      toast.success(res?.data?.message);
    } catch (err) {
      if (err.status === 403) {
        navigate("/verify-email", {
          state: { email: methods.getValues("email") },
        });
      }

      const errors = err?.data?.error?.errors;
      if (errors) {
        for (let error in errors) {
          methods.setError(error, {
            type: "manual",
            message: errors[error].msg,
          });
        }
        return;
      }
      const error = err?.data?.error;
      if (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full md:w-5/12">
        <Form {...{ methods, onSubmit }}>
          <FormHeading text="Login Form" subText="It's easy & free" />
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
          <div className="flex flex-wrap items-center justify-between">
            <FormLink to="/register" text="Havn't an account yet?" />
            <FormLink to="/send-otp" text="Forget your password?" />
          </div>
          <FormButton
            isSubmitting={isLoading}
            text={isLoading ? "Logging In" : "Login"}
          />
        </Form>
      </div>
    </div>
  );
};

export default Login;
