import apiSlice from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // Get all budgets
    getAllBudgets: build.query({
      query: (query) => {
        const { page, search, type, sort } = query;

        let queryString = ``;

        if (page) queryString += `&page=${page}`;
        if (search) queryString += `&search=${search}`;
        if (type) queryString += `&type=${type}`;
        if (sort) queryString += `&sort=${sort.join(",")}`;

        return {
          url: `budget?${queryString}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return response.data.result;
      },
      providesTags: ["budgets"],
      keepUnusedDataFor: 3600,
    }),
    // Create budget
    createBudget: build.mutation({
      query: (credentials) => ({
        url: "budget",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
        return response.data;
      },
      invalidatesTags: ["budgets"],
    }),
    // Update budget
    updateBudget: build.mutation({
      query: ({ id, credentials }) => ({
        url: `budget/${id}`,
        method: "PUT",
        body: credentials,
      }),
      transformResponse: (response) => {
        return response.data;
      },
      invalidatesTags: ["budgets"],
    }),
    // Delete budget
    deleteBudget: build.mutation({
      query: ({ id }) => ({
        url: `budget/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["budgets"],
    }),
  }),
});

export default userApi;
export const {
  useGetAllBudgetsQuery,
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
} = userApi;
