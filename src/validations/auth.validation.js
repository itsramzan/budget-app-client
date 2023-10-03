import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Register resolver
export const registerResolver = yupResolver(
  yup
    .object({
      username: yup
        .string()
        .required("Username required")
        .min(5, "Username minimum length 5")
        .max(15, "Username maximum length 15"),
      email: yup
        .string()
        .required("Email required")
        .email("Invalid email address"),
      password: yup
        .string()
        .required("Password required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    })
    .required()
);

// Verify email resolver
export const verifyEmailResolver = yupResolver(
  yup
    .object({
      otp: yup
        .string()
        .required("OTP required")
        .min(6, "OTP should be exactly 6 digits"),
    })
    .required()
);

// Send OTP resolver
export const sendOTPResolver = yupResolver(
  yup
    .object({
      email: yup
        .string()
        .required("Email required")
        .email("Invalid email address"),
    })
    .required()
);

// Reset password resolver
export const resetPasswordResolver = yupResolver(
  yup
    .object({
      password: yup
        .string()
        .required("Password required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirmPassword: yup
        .string()
        .required("Confirm password required")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
      otp: yup
        .string()
        .required("OTP required")
        .min(6, "OTP should be exactly 6 digits"),
    })
    .required()
);

// Login resolver
export const loginResolver = yupResolver(
  yup
    .object({
      email: yup
        .string()
        .required("Email required")
        .email("Invalid email address"),
      password: yup
        .string()
        .required("Password required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    })
    .required()
);
