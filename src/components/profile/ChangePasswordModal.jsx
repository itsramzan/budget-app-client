import React, { useState } from "react";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import { changePasswordResolver } from "../../validations/user.validation";
import { IoLockOpenOutline } from "react-icons/io5";
import Form from "../form/Form";
import FormHeading from "../form/FormHeading";
import FormControl from "../form/FormControl";
import FormButton from "../form/FormButton";
import { useChangePasswordMutation } from "../../features/user/userApi";
import { toast } from "react-hot-toast";

const ChangePasswordModal = () => {
  const [status, setStatus] = useState(false);

  const methods = useForm({ resolver: changePasswordResolver });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (credentials) => {
    try {
      const res = await changePassword(credentials).unwrap();
      toast.success(res.data.message);
      methods.reset();
      setStatus(true);
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

  // Necessary props for modal
  const modalProps = {
    id: "change-password-modal",
    element: (
      <button className="pointer-events-none btn btn-error rounded-md gap-2">
        <IoLockOpenOutline /> Change password
      </button>
    ),
    status,
    setStatus,
  };

  return (
    <Modal {...{ ...modalProps }}>
      <Form {...{ methods, onSubmit }}>
        <FormHeading text="Change Password Form" subText="It's easy & free" />
        <FormControl
          control="password"
          label="Enter your current password"
          name="currentPassword"
        />
        <FormControl
          control="password"
          label="Enter your new password"
          name="newPassword"
        />
        <FormButton
          isSubmitting={isLoading}
          text={isLoading ? "Password Changing..." : "Change Password"}
        />
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
