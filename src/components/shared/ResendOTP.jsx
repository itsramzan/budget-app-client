import React from "react";
import { useSendOTPMutation } from "../../features/auth/authApi";
import { toast } from "react-hot-toast";

const ResendOTP = ({ email }) => {
  const [sendOTP, { isLoading }] = useSendOTPMutation();

  const handleSendOTP = async () => {
    try {
      const res = await sendOTP({ email }).unwrap();
      toast.success(res?.data?.message);
    } catch (err) {
      toast.error("OTP sending failed");
    }
  };

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={handleSendOTP}
      className="hover:link link-primary"
    >
      {isLoading ? "Sending OTP..." : "Resend OTP?"}
    </button>
  );
};

export default ResendOTP;
