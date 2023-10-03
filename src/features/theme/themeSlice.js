import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "fantasy",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
  },
});

export default themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;
