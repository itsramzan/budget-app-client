import React, { useState } from "react";
import Modal from "../ui/Modal";
import { useForm } from "react-hook-form";
import { createBudgetResolver } from "../../validations/budget.validation";
import { IoAddOutline } from "react-icons/io5";
import Form from "../form/Form";
import FormHeading from "../form/FormHeading";
import FormControl from "../form/FormControl";
import FormButton from "../form/FormButton";
import { useCreateBudgetMutation } from "../../features/budget/budgetApi";
import { toast } from "react-hot-toast";

const CreateBudgetModal = () => {
  const [status, setStatus] = useState(false);

  const methods = useForm({ resolver: createBudgetResolver });

  const [createBudget, { isLoading }] = useCreateBudgetMutation();

  const onSubmit = async (credentials) => {
    try {
      const res = await createBudget(credentials).unwrap();
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
    id: "add-budget-modal",
    element: (
      <div className="btn btn-xs btn-primary btn-outline">
        <IoAddOutline />
      </div>
    ),
    status,
    setStatus,
  };

  return (
    <Modal {...{ ...modalProps }}>
      <Form {...{ methods, onSubmit }}>
        <FormHeading text="Create Budget Form" subText="It's easy & free" />
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
          text={isLoading ? "Creating..." : "Create"}
        />
      </Form>
    </Modal>
  );
};

export default CreateBudgetModal;
