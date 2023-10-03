import apiSlice from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // Get user profile
    getProfile: build.query({
      query: () => ({
        url: "user/profile",
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data.result;
      },
      keepUnusedDataFor: 3600,
    }),
    // Update details
    updateDetails: build.mutation({
      query: (credentials) => ({
        url: "user/update-details",
        method: "PUT",
        body: credentials,
      }),
      transformResponse: (response) => {
        return response.data;
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const { result } = res.data;
          if (result) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getProfile",
                undefined,
                (draft) => {
                  Object.assign(draft, result);
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
    // Update avatar
    updateAvatar: build.mutation({
      query: (credentials) => ({
        url: "user/update-avatar",
        method: "PUT",
        body: credentials,
      }),
      transformResponse: (response) => {
        return response.data.result;
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const { data } = res;
          if (data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getProfile",
                undefined,
                (draft) => {
                  draft.avatar = data.avatar;
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
    // Change password
    changePassword: build.mutation({
      query: (credentials) => ({
        url: "user/change-password",
        method: "PUT",
        body: credentials,
      }),
    }),
  }),
});

export default userApi;
export const {
  useGetProfileQuery,
  useUpdateDetailsMutation,
  useUpdateAvatarMutation,
  useChangePasswordMutation,
} = userApi;
