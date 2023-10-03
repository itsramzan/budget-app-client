import apiSlice from "../api/apiSlice";
import { setAuth } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // Register
    register: build.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    // Verify email
    verifyEmail: build.mutation({
      query: (credentials) => ({
        url: "auth/verify-email",
        method: "POST",
        body: credentials,
      }),
    }),
    // Send OTP
    sendOTP: build.mutation({
      query: (credentials) => ({
        url: "auth/send-otp",
        method: "POST",
        body: credentials,
      }),
    }),
    // Reset password
    resetPassword: build.mutation({
      query: (credentials) => ({
        url: "auth/reset-password",
        method: "POST",
        body: credentials,
      }),
    }),
    // Login
    login: build.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          const { accessToken } = res?.data?.data?.result || {};
          dispatch(setAuth({ accessToken }));
        } catch (err) {}
      },
    }),
  }),
});

export default authApi;
export const {
  useRegisterMutation,
  useVerifyEmailMutation,
  useSendOTPMutation,
  useResetPasswordMutation,
  useLoginMutation,
} = authApi;
