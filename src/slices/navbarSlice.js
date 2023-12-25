import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    height: null,
  },
  reducers: {
    setNavbarHeight: (state, action) => {
      state.height = action.payload;
    },
  },
});

export const { setNavbarHeight } = navbarSlice.actions;

export default navbarSlice.reducer;
