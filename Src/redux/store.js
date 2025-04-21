// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducers/authReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
