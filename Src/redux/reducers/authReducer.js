
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  // user: null,
  user: {
    name: null,
    email: null,
    phoneNumber: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    setUserDetails: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setAuthToken, logout ,setUserDetails,} = authSlice.actions;
export default authSlice.reducer;
