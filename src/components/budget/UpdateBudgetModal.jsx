import React, { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import { createBudgetResolver } from "../../validations/budget.validation";
import Form from "../form/Form";
import FormHeading from "../form/FormHeading";
import FormControl from "../form/FormControl";
import FormButton from "../form/FormButton";
import { useUpdateBudgetMutation } from "../../features/budget/budgetApi";
import { toast } from "react-hot-toast";

const UpdateBudgetModal = ({ data }) => {
  const [status, setStatus] = useState(false);

  const methods = useForm({
    resolver: createBudgetResolver,
  });

  useEffect(() => {
    methods.setValue("title", data.title);
    methods.setValue("type", data.type);
    methods.setValue("amount", data.amount);
  }, [data]);

  const [updateBudget, { isLoading }] = useUpdateBudgetMutation();

  const onSubmit = async (credentials) => {
    try {
      const res = await updateBudget({ id: data._id, credentials }).unwrap();
      toast.success(res.message);
      setStatus(true);
      methods.reset();
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
    id: "update-budget-modal",
    element: null,
    status,
    setStatus,
  };

  return (
    <Modal {...{ ...modalProps }}>
      <Form {...{ methods, onSubmit }}>
        <FormHeading text="Update Budget Form" subText="It's easy & free" />
        <FormControl
          control="input"
          label="Enter budget title"
          type="text"
          name="title"
        />
        <FormControl
          control="radio"
          label="Select budget type"
          name="type"
          options={["income", "expense"]}
        />
        <FormControl
          control="input"
          label="Enter your budget amount"
          type="number"
          name="amount"
        />
        <FormButton
          isSubmitting={isLoading}
          text={isLoading ? "Updating..." : "Update"}
        />
      </Form>
    </Modal>
  );
};

export default UpdateBudgetModal;
