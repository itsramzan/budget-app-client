import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPasswordResolver } from "../validations/auth.validation";
import Form from "../components/form/Form";
import FormHeading from "../components/form/FormHeading";
import FormControl from "../components/form/FormControl";
import FormLink from "../components/form/FormLink";
import FormButton from "../components/form/FormButton";
import { useResetPasswordMutation } from "../features/auth/authApi";
import { toast } from "react-hot-toast";
import ResendOTP from "../components/shared/ResendOTP";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  // Redirect user to login page if email doesn't exists
  useEffect(() => {
    if (!email) navigate("/login");
  }, [email]);

  const methods = useForm({ resolver: resetPasswordResolver });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data) => {
    try {
      const credentials = { ...data, email };
      const res = await resetPassword(credentials).unwrap();
      toast.success(res?.data?.message);
      navigate("/login");
    } catch (err) {
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

  if (!email) return null;

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full md:w-5/12">
        <Form {...{ methods, onSubmit }}>
          <FormHeading text="Reset Password Form" subText="It's easy & free" />
          <FormControl
            control="password"
            label="Enter your password"
            name="password"
          />
          <FormControl
            control="password"
            label="Confirm your password"
            name="confirmPassword"
          />
          <FormControl control="otp" label="Enter your OTP" name="otp" />
          <div className="flex flex-wrap items-center justify-between">
            <FormLink to="/login" text="Wanna back to login?" />
          </div>
          <FormButton
            isSubmitting={isLoading}
            text={isLoading ? "Password Resetting..." : "Reset Password"}
          />
          <div className="text-center">
            <ResendOTP {...{ email }} />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
