import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";

// Details update resolver
export const detailsUpdateResolver = yupResolver(
  yup.object({
    username: yup
      .string()
      .required("Username required")
      .min(2, "Username must be minimum 2 character")
      .max(15, "Username must be maximum, 15 character"),
    dateOfBirth: yup
      .date()
      .typeError("Invalid date format")
      .test(
        "Is date greater",
        "DOB can't be greater than today's date",
        (value) => {
          if (!value) return true;
          return moment().diff(value) > 0;
        }
      ),
    gender: yup
      .string()
      .oneOf(["male", "female"], "Not a valid gender type")
      .required("Gender required"),
    mobile: yup
      .string()
      .matches(/^(?:(?:\+|00)88|01)?\d{11}$/g, "Not a valid mobile number")
      .required("Mobile number required"),
    address: yup
      .string()
      .trim()
      .max(150, "Address can't be longer than 150 character")
      .required("Address required"),
  })
);

// Avatar update resolver
export const avatarUpdateResolver = yupResolver(
  yup
    .object({
      avatar: yup
        .mixed()
        .test("required", "You need to provide a file", (file) => {
          if (file.length > 0) return true;
          return false;
        })
        .test("fileSize", "The file is to large", (file) => {
          return file.length > 0 && file[0].size <= 10000000; // 10MB
        })
        .test("fileType", "File only contain image", (file) => {
          return (
            file.length > 0 &&
            ["image/jpeg", "image/png"].includes(file[0].type)
          );
        }),
    })
    .required()
);

// Change password resolver
export const changePasswordResolver = yupResolver(
  yup
    .object({
      currentPassword: yup
        .string()
        .required("Current password required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      newPassword: yup
        .string()
        .required("New password required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    })
    .required()
);
