import React, { useState } from "react";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import { avatarUpdateResolver } from "../../validations/user.validation";
import { IoCloudUpload } from "react-icons/io5";
import Form from "../form/Form";
import FormHeading from "../form/FormHeading";
import FormControl from "../form/FormControl";
import FormButton from "../form/FormButton";
import { useUpdateAvatarMutation } from "../../features/user/userApi";
import { toast } from "react-hot-toast";

const AvatarUpdateModal = () => {
  const [status, setStatus] = useState(false);

  const methods = useForm({ resolver: avatarUpdateResolver });

  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();

  const onSubmit = async (credentials) => {
    try {
      const formData = new FormData();
      formData.append("avatar", credentials.avatar[0]);
      await updateAvatar(formData).unwrap();
      setStatus(true);
      toast.success("Avatar successfully uploaded");
    } catch (err) {
      toast.error("Avatar upload failed");
    }
  };

  // Necessary props for modal
  const modalProps = {
    id: "avatar-update-modal",
    element: (
      <IoCloudUpload className="absolute bottom-6 right-6 h-6 w-6 p-1 text-primary bg-base-100 ring-4 ring-primary rounded-full cursor-pointer" />
    ),
    status,
    setStatus,
  };

  return (
    <Modal {...{ ...modalProps }}>
      <Form {...{ methods, onSubmit }}>
        <FormHeading text="Avatar Update Form" subText="It's easy & free" />
        <FormControl control="file" label="Select your file" name="avatar" />
        <FormButton
          isSubmitting={isLoading}
          text={isLoading ? "Uploading..." : "Upload"}
        />
      </Form>
    </Modal>
  );
};

export default AvatarUpdateModal;
