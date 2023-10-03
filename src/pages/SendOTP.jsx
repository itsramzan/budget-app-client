import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { sendOTPResolver } from "../validations/auth.validation";
import Form from "../components/form/Form";
import FormHeading from "../components/form/FormHeading";
import FormControl from "../components/form/FormControl";
import FormButton from "../components/form/FormButton";
import { useSendOTPMutation } from "../features/auth/authApi";
import { toast } from "react-hot-toast";

const SendOTP = () => {
  const methods = useForm({ resolver: sendOTPResolver });
  const navigate = useNavigate();

  const [sendOTP, { isLoading }] = useSendOTPMutation();

  const onSubmit = async (credentials) => {
    try {
      const res = await sendOTP(credentials).unwrap();
      toast.success(res?.data?.message);
      navigate("/reset-password", {
        state: { email: methods.getValues("email") },
      });
    } catch (err) {
      toast.error(err?.data?.error?.message);
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full md:w-5/12">
        <Form {...{ methods, onSubmit }}>
          <FormHeading text="Send OTP Form" subText="It's easy & free" />
          <FormControl
            control="input"
            label="Enter your email"
            type="email"
            name="email"
          />
          <FormButton
            isSubmitting={isLoading}
            text={isLoading ? "OTP Sending..." : "Send OTP"}
          />
        </Form>
      </div>
    </div>
  );
};

export default SendOTP;
