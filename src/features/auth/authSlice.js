import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
    },
    removeAuth: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
    },
  },
});

export default authSlice.reducer;
export const { setAuth, removeAuth } = authSlice.actions;
