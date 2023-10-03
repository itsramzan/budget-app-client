import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuth, removeAuth } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders: async (headers, { getState }) => {
    const { accessToken } = getState().auth;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
      headers.set("Access-Control-Allow-Origin", "*");
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: "auth/refresh-token", method: "POST" },
      api,
      extraOptions
    );
    const { accessToken } = refreshResult?.data?.data?.result || {};
    if (accessToken) {
      api.dispatch(setAuth({ accessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(removeAuth());
    }
  }

  return result;
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["budgets"],
  endpoints: (build) => ({}),
});

export default apiSlice;
