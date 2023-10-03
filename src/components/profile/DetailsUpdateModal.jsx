import React, { useState } from "react";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import { detailsUpdateResolver } from "../../validations/user.validation";
import moment from "moment/moment";
import { TbEdit } from "react-icons/tb";
import Form from "../form/Form";
import FormHeading from "../form/FormHeading";
import FormControl from "../form/FormControl";
import FormButton from "../form/FormButton";
import { useUpdateDetailsMutation } from "../../features/user/userApi";
import { toast } from "react-hot-toast";

const DetailsUpdateModal = ({ data }) => {
  const [status, setStatus] = useState(false);

  const methods = useForm({
    resolver: detailsUpdateResolver,
    defaultValues: {
      username: data.username,
      dateOfBirth: moment(data.dateOfBirth).format("YYYY-MM-DD"),
      gender: data.gender,
      mobile: data.mobile,
      address: data.address,
    },
  });

  const [updateDetails, { isLoading }] = useUpdateDetailsMutation();

  const onSubmit = async (credentials) => {
    try {
      const res = await updateDetails(credentials).unwrap();
      toast.success(res.message);
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
    id: "details-update-modal",
    element: <TbEdit className="text-2xl text-primary cursor-pointer" />,
    status,
    setStatus,
  };

  return (
    <Modal {...{ ...modalProps }}>
      <Form {...{ methods, onSubmit }}>
        <FormHeading text="Details Update Form" subText="It's easy & free" />
        <div className="flex flex-col md:flex-row gap-4">
          <FormControl
            control="input"
            label="Enter your username"
            type="text"
            name="username"
          />
          <FormControl
            control="input"
            label="Enter your date of birth"
            type="date"
            name="dateOfBirth"
          />
        </div>
        <FormControl
          control="radio"
          label="Select your gender"
          name="gender"
          options={["male", "female"]}
        />
        <FormControl
          control="input"
          label="Enter your mobile number"
          type="text"
          name="mobile"
        />
        <FormControl
          control="textarea"
          label="Enter your address"
          name="address"
        />
        <FormButton
          isSubmitting={isLoading}
          text={isLoading ? "Updating..." : "Update"}
        />
      </Form>
    </Modal>
  );
};

export default DetailsUpdateModal;
