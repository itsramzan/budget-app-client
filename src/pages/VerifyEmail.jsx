import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { verifyEmailResolver } from "../validations/auth.validation";
import Form from "../components/form/Form";
import FormHeading from "../components/form/FormHeading";
import FormControl from "../components/form/FormControl";
import FormButton from "../components/form/FormButton";
import maskEmail from "../utils/maskEmail";
import { useVerifyEmailMutation } from "../features/auth/authApi";
import { toast } from "react-hot-toast";
import ResendOTP from "../components/shared/ResendOTP";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  // Redirect user to login page if verification mail doesn't exists
  useEffect(() => {
    if (!email) navigate("/login");
  }, [email]);

  const methods = useForm({ resolver: verifyEmailResolver });
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const onSubmit = async (data) => {
    try {
      const credentials = { ...data, email };
      const res = await verifyEmail(credentials).unwrap();
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
          <FormHeading
            text="One Time Password"
            subText={`Input the code sent at ${maskEmail(email)}`}
          />
          <FormControl
            control="otp"
            label="Enter your otp"
            type="text"
            name="otp"
          />
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => methods.reset()}
              className="btn btn-sm btn-primary btn-outline"
            >
              Reset
            </button>
            <FormButton
              isSubmitting={isLoading}
              text={isLoading ? "Verifying" : "Verify"}
            />
          </div>
          <div className="text-center">
            <ResendOTP {...{ email }} />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmail;
