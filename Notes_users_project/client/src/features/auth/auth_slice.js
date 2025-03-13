import { createSlice } from "@reduxjs/toolkit";

const auth_slice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    set_credentials: (state, action) => {
      const { access_token } = action.payload;
      state.token = access_token;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { set_credentials, logout } = auth_slice.actions;

export default auth_slice.reducer;

export const select_current_token = (state) => state.auth.token;
