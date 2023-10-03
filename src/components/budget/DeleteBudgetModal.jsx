import React, { useState } from "react";
import Modal from "../ui/Modal";
import { useDeleteBudgetMutation } from "../../features/budget/budgetApi";
import { toast } from "react-hot-toast";

const DeleteBudgetModal = ({ data }) => {
  const [status, setStatus] = useState(false);

  const [deleteBudget, { isLoading }] = useDeleteBudgetMutation();

  const handleDeleteBudget = async () => {
    try {
      const res = await deleteBudget({ id: data._id }).unwrap();
      toast.success(res.data.message);
      setStatus(true);
    } catch (err) {
      toast.error(err?.data?.error?.message || "Failed to delete budget");
    }
  };

  // Necessary props for modal
  const modalProps = {
    id: "delete-budget-modal",
    element: null,
    status,
    setStatus,
  };

  return (
    <Modal {...{ ...modalProps }}>
      <div className="space-y-4">
        <p className="text-primary text-lg font-bold">
          Are you sure to delete?
        </p>
        <p>"{data.title}"</p>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setStatus(true)}
            className="btn btn-xs btn-success btn-outline"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDeleteBudget}
            disabled={isLoading}
            className="btn btn-xs btn-error"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBudgetModal;
