import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Create budget resolver
export const createBudgetResolver = yupResolver(
  yup.object({
    title: yup.string().required("Budget title can't be empty"),
    type: yup
      .string()
      .oneOf(["income", "expense"], "Invalid budget type")
      .required("Budget type required"),
    amount: yup
      .number()
      .required("Budget amount required")
      .typeError("Budget amount must be valid number"),
  })
);
