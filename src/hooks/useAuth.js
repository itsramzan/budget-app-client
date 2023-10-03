import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAuth } from "../features/auth/authSlice";
import apiSlice from "../features/api/apiSlice";

const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(removeAuth());
    dispatch(apiSlice.util.resetApiState());
  };

  return { ...auth, logout };
};

export default useAuth;
