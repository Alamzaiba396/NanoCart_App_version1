
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducers/authReducer";
import itemReducer from "../redux/reducers/itemSlice";
import wishlistReducer from "../redux/reducers/wishlistSlice";  
import cartReducer from "./reducers/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer, // ✅ REGISTER ITEM REDUCER
    wishlist: wishlistReducer, 
    cart: cartReducer, //
  },
});
